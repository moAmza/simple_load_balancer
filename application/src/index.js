const express = require("express");
const dotenv = require("dotenv");
const initMetrics = require("./init-metrics");

dotenv.config();

const run = async () => {
  const metrics = initMetrics();

  const router = express
    .Router()
    .get("/", (req, res) =>
      res.send(`Your request recived, and the prometheus metrics updated.`)
    );

  const app = express()
    .use("/metrics", metrics.router)
    .use(metrics.middleware)
    .use(router)
    .listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    );
};

run();
