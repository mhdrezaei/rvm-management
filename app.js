const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const databaseConnection = require("./config/databaseConnection");
const PORT = process.env.PORT;
databaseConnection();

const user = require("./routes/manager");
const status = require("./routes/status");
const summary = require("./routes/sunmmary");

// route
app.use("/api/v1/", user);
app.use("/api/v1/", status);
app.use("/api/v1/", summary);

const server = app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});
