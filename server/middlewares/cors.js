const cors = require('cors');

const whitelist = ['https://grepnet.piecioshka.io'];

module.exports = (app) => {
  app.use(
    cors({
      origin: (origin, callback) => {
        callback(null, whitelist.includes(origin ?? ''));
      },
    }),
  );
};
