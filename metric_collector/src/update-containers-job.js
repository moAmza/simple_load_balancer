const { updateMetricsConfig } = require("./init-prom-metrics");

const exec = require("child_process").exec;

const setJob = (task, time) => {
  task();
  setTimeout(() => setJob(task, time), time);
};

const updateContainers = () =>
  exec(`sh ${process.env.BASH_PATH}`, (err, out) => {
    servers = out
      .split("\n")
      .map((line) => {
        if (!line) return null;
        const containerId = line.split(" ")[0];
        const port = line.split("->")[0].split(":")[1];
        return { url: `${process.env.HOST_IP}:${port}`, containerId };
      })
      .filter((x) => x !== null);
    updateMetricsConfig(servers);
  });

const configAutoUpdateContainers = () => {
  setJob(updateContainers, process.env.UPDATE_SERVERS_TIME);
};

module.exports = configAutoUpdateContainers;
