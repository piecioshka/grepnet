const { collectDefaultMetrics, register } = require("prom-client");
const express = require("express");
const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

module.exports = (app) => {
  collectDefaultMetrics();
  app.use("/metrics", router);
};
