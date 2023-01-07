const allMetrics = {};

const updateMetricsConfig = (containers) => {
  console.log(containers.map((x) => ({ [x.containerId]: x.url })));
  containers.map((container) => {
    fetch(`${container.url}/metrics`).then(async (res) => {
      let json = await res.json();
      allMetrics[container.containerId] = json;
    });
  });
};

const metricsRouter = (req, res) => {
  res.json(allMetrics);
};

module.exports = { updateMetricsConfig, metricsRouter };
