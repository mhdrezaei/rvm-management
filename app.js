const express = require("express");
const app = express();
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const databaseConnection = require("./config/databaseConnection");
const PORT = process.env.PORT;

// cors
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
console.log(corsOptions)

app.use(express.json());

// connect to database
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
