const initMetrics = () => {
  const metricsRouter = {
    numberOfRequests: 0,
  };

  return {
    router: (req, res) => {
      res.set("Content-Type", "application/json");
      res.end(JSON.stringify(metricsRouter));
    },
    middleware: (req, res, next) => {
      metricsRouter.numberOfRequests = metricsRouter.numberOfRequests + 1;
      next();
    },
  };
};

module.exports = initMetrics;
