const exec = require("child_process").exec;

let servers = [];
let serverIndex = 0;

const setJob = (task, time) => {
  task();
  setTimeout(() => setJob(task, time), time);
};

const updateTargets = () =>
  exec(`sh ${process.env.BASH_PATH}`, (err, out) => {
    servers = out
      .split("\n")[0]
      .split(" ")
      .map((x) => (x ? `${process.env.HOST_IP}:${x}` : null))
      .filter((x) => x !== null);
    console.log("Servers: ", servers);
  });

const configServers = (proxyServer) => {
  setJob(updateTargets, process.env.UPDATE_SERVERS_TIME);

  return {
    router: (req, res) => {
      if (servers.length === 0) {
        res.writeHead(500);
        res.write("No available server!");
        return res.end();
      }
      serverIndex = (serverIndex + 1) % servers.length;
      console.log(`Request was directed to ${servers[serverIndex]}`);
      proxyServer.web(req, res, { target: servers[serverIndex] });
    },
  };
};

module.exports = configServers;
