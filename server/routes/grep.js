const express = require('express');
const { assertPublicHttpUrl } = require('../utils/validate-url');
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
    await assertPublicHttpUrl(url);
    const response = await fetch(url);
    const body = await response.text();
    const found = new RegExp(escapeRegExp(phrase), 'i').test(body);
    console.log(`> ${url}: "${phrase}" => ${found}`);
    res.json({ url, phrase, found });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = (app) => {
  app.use('/grep', router);
};
