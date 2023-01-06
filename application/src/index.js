const express = require("express");
const dotenv = require("dotenv");
const configPrometheus = require("./prom-config");

dotenv.config();

const run = async () => {
  const promConfig = configPrometheus();

  const router = express
    .Router()
    .get("/", (req, res) =>
      res.send(`Your request recived, and the prometheus metrics updated.`)
    );

  const app = express()
    .use("/metrics", promConfig.router)
    .use(promConfig.middleware)
    .use(router)
    .listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    );
};

run();
