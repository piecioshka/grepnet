require("isomorphic-fetch");
const express = require("express");
const router = express.Router();

/**
 * POST /grep
 *   url: string
 *   phrase: string
 */
router.post("/", async (req, res) => {
  const { url, phrase } = req.body;

  try {
    const response = await fetch(url);
    const body = await response.text();
    const found = new RegExp(phrase, "i").test(body);
    console.log(`> ${url}: "${phrase}" => ${found}`);
    res.json({ url, phrase, found });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = (app) => {
  app.use("/grep", router);
};
