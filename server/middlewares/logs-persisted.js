const path = require('node:path');
const fs = require('node:fs');
const morgan = require('morgan');

module.exports = (app) => {
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '../../logs/access.log'),
    { flags: 'a' },
  );

  app.use(morgan('combined', { stream: accessLogStream }));
};
