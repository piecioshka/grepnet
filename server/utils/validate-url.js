const dns = require('node:dns');
const net = require('node:net');
const { Agent, buildConnector } = require('undici');

const BLOCKED_HOSTNAMES = new Set(['localhost']);

const INTERNAL_HOST_MESSAGE = 'Requests to internal hosts are not allowed';

function isPrivateAddress(address, family) {
  if (family === 6) {
    const ip = address.toLowerCase();
    if (ip === '::' || ip === '::1') {
      return true;
    }
    // Link-local (fe80::/10) and unique local (fc00::/7) addresses
    const firstHextet = parseInt(ip.split(':', 1)[0] || '0', 16);
    if (
      (firstHextet & 0xffc0) === 0xfe80 ||
      (firstHextet & 0xfe00) === 0xfc00
    ) {
      return true;
    }
    // IPv4-mapped IPv6 addresses, e.g. ::ffff:127.0.0.1 or ::ffff:7f00:1
    if (ip.startsWith('::ffff:')) {
      const rest = ip.slice('::ffff:'.length);
      if (rest.includes('.')) {
        return isPrivateAddress(rest, 4);
      }
      const groups = rest.split(':').map((part) => parseInt(part, 16));
      if (groups.length === 2) {
        const mapped = [
          groups[0] >> 8,
          groups[0] & 0xff,
          groups[1] >> 8,
          groups[1] & 0xff,
        ].join('.');
        return isPrivateAddress(mapped, 4);
      }
      return true;
    }
    return false;
  }

  const [a, b] = address.split('.').map(Number);
  return (
    a === 0 || // 0.0.0.0/8
    a === 10 || // 10.0.0.0/8
    a === 127 || // 127.0.0.0/8 (loopback)
    (a === 169 && b === 254) || // 169.254.0.0/16 (link-local)
    (a === 172 && b >= 16 && b <= 31) || // 172.16.0.0/12
    (a === 192 && b === 168) // 192.168.0.0/16
  );
}

function isBlockedHostname(hostname) {
  const host = hostname.replace(/^\[|\]$/g, '').toLowerCase();
  if (BLOCKED_HOSTNAMES.has(host)) {
    return true;
  }
  const family = net.isIP(host);
  return family !== 0 && isPrivateAddress(host, family);
}

// DNS lookup that rejects results pointing at internal hosts. Enforced at
// connection time (also on every redirect hop), so a hostname cannot pass
// validation and then re-resolve to an internal address (DNS rebinding).
function guardedLookup(hostname, options, callback) {
  dns.lookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err) {
      return callback(err);
    }
    const entries = Array.isArray(addresses)
      ? addresses
      : [{ address: addresses, family: net.isIP(addresses) }];
    const internal = entries.find((entry) =>
      isPrivateAddress(entry.address, entry.family),
    );
    if (internal) {
      return callback(new Error(INTERNAL_HOST_MESSAGE));
    }
    if (options.all) {
      return callback(null, entries);
    }
    return callback(null, entries[0].address, entries[0].family);
  });
}

const baseConnector = buildConnector({ lookup: guardedLookup });

// The lookup hook is skipped for IP literals, so check those here too.
function guardedConnect(options, callback) {
  if (isBlockedHostname(options.hostname || '')) {
    return callback(new Error(INTERNAL_HOST_MESSAGE), null);
  }
  return baseConnector(options, callback);
}

// Dispatcher for fetch() that keeps the original hostname (TLS certificate
// validation and the Host header stay correct) while blocking connections
// to loopback, link-local, and private addresses.
const publicHttpDispatcher = new Agent({ connect: guardedConnect });

/**
 * Ensures that the URL is a http(s) address without embedded credentials
 * and does not point at an internal host by name or IP literal. Where the
 * hostname actually connects to is enforced separately by
 * `publicHttpDispatcher` at connection time.
 *
 * @param {string} url
 * @throws {Error} When the URL is invalid or points at an internal host.
 */
function assertPublicHttpUrl(url) {
  let parsed;

  try {
    parsed = new URL(url);
  } catch {
    throw new Error('Invalid URL');
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error('Only http and https URLs are allowed');
  }

  if (parsed.username || parsed.password) {
    throw new Error('URLs with embedded credentials are not allowed');
  }

  if (isBlockedHostname(parsed.hostname)) {
    throw new Error(INTERNAL_HOST_MESSAGE);
  }
}

module.exports = {
  assertPublicHttpUrl,
  publicHttpDispatcher,
  INTERNAL_HOST_MESSAGE,
};
