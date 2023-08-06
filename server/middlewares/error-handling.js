const express = require("express");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
function errorHandler(req, res, next) {
  next({
    status: "error",
    error: {
      message: "Not Found",
      statusCode: 404,
    },
  });
}

/**
 * @param {Record<string, any>} err
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
function genericErrorHandler(err, req, res, next) {
  res.status(err.error.statusCode || 500).json(err);
}

/**
 * @param {express.Application} app
 */
module.exports = (app) => {
  app.use(errorHandler);
  app.use(genericErrorHandler);
};
