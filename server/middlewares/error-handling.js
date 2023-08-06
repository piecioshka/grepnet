const express = require('express');

/**
 * @param {express.Request} _req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 */
function errorHandler(_req, _res, next) {
  next({
    status: 'error',
    error: {
      message: 'Not Found',
      statusCode: 404,
    },
  });
}

/**
 * @param {Record<string, any>} err
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} _next
 */
function genericErrorHandler(err, req, res, _next) {
  res.status(err.error.statusCode || 500).json(err);
}

/**
 * @param {express.Application} app
 */
module.exports = (app) => {
  app.use(errorHandler);
  app.use(genericErrorHandler);
};
