import http from "http";
import proxy from "http-proxy";
import dotenv from "dotenv";
import { exec } from "child_process";

dotenv.config();

let targets = [];

const updateTargets = () =>
  exec("docker start", (err, out) => {
    console.log(out.length, out);
    console.log(err);
    targets = out
      ? out
          .split("\n")[0]
          .split(" ")
          .map((x) => `http://host.docker.internal:8000`)
      : [];
    console.log(targets);
  });

const setJob = (task, time) => {
  task();
  setTimeout(() => setJob(task, time), time);
};

const run = async () => {
  setJob(updateTargets, process.env.UPDATE_SERVERS_TIME);
  const proxyServer = proxy.createProxyServer();
  http
    .createServer((req, res) => {
      if (targets.length === 0) {
        res.writeHead(500);
        res.write("No available server!");
        return res.end();
      }
      const targetIndex = Math.floor(Math.random() * targets.length);
      proxyServer.web(req, res, { target: targets[targetIndex] }, (e) => {
        updateTargets();
      });
    })
    .listen(process.env.PORT, () =>
      console.log(`Proxy server is running in port ${process.env.PORT}`)
    );
};

run();
