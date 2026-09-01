const dns = require('node:dns');
const net = require('node:net');

const BLOCKED_HOSTNAMES = new Set(['localhost']);

function isPrivateAddress(address, family) {
  if (family === 6) {
    const ip = address.toLowerCase();
    if (ip === '::' || ip === '::1') {
      return true;
    }
    // Link-local (fe80::/10) and unique local (fc00::/7) addresses
    if (ip.startsWith('fe80:') || ip.startsWith('fc') || ip.startsWith('fd')) {
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

/**
 * Ensures that the URL is a http(s) address without embedded credentials
 * and does not point at an internal host (loopback, link-local, private).
 *
 * @param {string} url
 * @throws {Error} When the URL is invalid or points at an internal host.
 */
async function assertPublicHttpUrl(url) {
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

  const hostname = parsed.hostname.replace(/^\[|\]$/g, '').toLowerCase();

  if (BLOCKED_HOSTNAMES.has(hostname)) {
    throw new Error('Requests to internal hosts are not allowed');
  }

  const family = net.isIP(hostname);
  const addresses = family
    ? [{ address: hostname, family }]
    : await dns.promises.lookup(hostname, { all: true });

  for (const entry of addresses) {
    if (isPrivateAddress(entry.address, entry.family)) {
      throw new Error('Requests to internal hosts are not allowed');
    }
  }
}

module.exports = { assertPublicHttpUrl };
