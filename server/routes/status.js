const express = require("express");
const router = express.Router();

// GET /status
router.get("/", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = (app) => {
  app.use("/status", router);
};
