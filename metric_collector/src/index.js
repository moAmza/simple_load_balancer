const express = require("express");
const dotenv = require("dotenv");
const configServers = require("./update-containers-job");
const { metricsRouter } = require("./init-prom-metrics");

dotenv.config();

const run = async () => {
  configServers();
  const app = express()
    .get("/", metricsRouter)
    .listen(process.env.PORT, () =>
      console.log(`All Metrics are available on port ${process.env.PORT}`)
    );
};

run();
