const morgan = require("morgan");

module.exports = (app) => {
  app.use(
    morgan("dev", {
      skip: (req, res) => res.statusCode < 400,
    })
  );
};
