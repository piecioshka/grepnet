const process = require("node:process");
const express = require("express");

const port = process.env.PORT || 3000;
const app = express();

require("./middlewares/bodyParser")(app);
require("./middlewares/cors")(app);
require("./middlewares/logs")(app);
require("./middlewares/tweak")(app);
// require("./middlewares/logs-persisted")(app);
// require("./middlewares/static")(app);

// require("./routes/grafana")(app);
require("./routes/grep")(app);
require("./routes/status")(app);

// Handling 404, so must be defined after all routes
require("./middlewares/error-handling")(app);

app.listen(port, (err) => {
  if (err) throw err;
  console.info(
    `[${app.get("env")}] Server started at http://localhost:${port}`
  );
});
