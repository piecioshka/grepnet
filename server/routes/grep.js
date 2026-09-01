const express = require('express');
// fetch from undici, not the global one - a dispatcher is only accepted by
// the fetch built from the same undici version
const { fetch } = require('undici');
const {
  assertPublicHttpUrl,
  publicHttpDispatcher,
  INTERNAL_HOST_MESSAGE,
} = require('../utils/validate-url');
const router = express.Router();

const MAX_PHRASE_LENGTH = 200;

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * POST /grep
 *   url: string
 *   phrase: string
 */
router.post('/', async (req, res) => {
  const { url, phrase } = req.body;

  if (typeof phrase !== 'string' || phrase.length === 0) {
    return res.status(400).json({ message: 'Phrase is required' });
  }

  if (phrase.length > MAX_PHRASE_LENGTH) {
    return res.status(400).json({
      message: `Phrase is too long (max ${MAX_PHRASE_LENGTH} characters)`,
    });
  }

  try {
    assertPublicHttpUrl(url);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const response = await fetch(url, { dispatcher: publicHttpDispatcher });
    const body = await response.text();
    const found = new RegExp(escapeRegExp(phrase), 'i').test(body);
    console.log(`> ${url}: "${phrase}" => ${found}`);
    res.json({ url, phrase, found });
  } catch (error) {
    console.error(error);
    if (error.cause && error.cause.message === INTERNAL_HOST_MESSAGE) {
      return res.status(400).json({ message: INTERNAL_HOST_MESSAGE });
    }
    res.status(502).json({ message: 'Unable to fetch the requested URL' });
  }
});

module.exports = (app) => {
  app.use('/grep', router);
};
