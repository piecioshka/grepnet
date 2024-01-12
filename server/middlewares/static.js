const path = require('node:path');
const express = require('express');

const root = path.join(__dirname, '..', '..');

module.exports = (app) => {
  app.use(express.static(path.join(root, 'dist')));
};
