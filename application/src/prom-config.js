const client = require("prom-client");

const configPrometheus = () => {
  const register = new client.Registry();
  const numOfRequests = new client.Counter({
    name: "numOfRequests",
    help: "Number of requests made",
    labelNames: ["method"],
  });
  register.registerMetric(numOfRequests);

  return {
    router: async (req, res) => {
      res.set("Content-Type", register.contentType);
      res.end(await register.metrics(register));
    },
    middleware: (req, res, next) => {
      numOfRequests.inc(1);
      next();
    },
  };
};

module.exports = configPrometheus;
