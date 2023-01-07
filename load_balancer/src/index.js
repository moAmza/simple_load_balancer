const http = require("http");
const proxy = require("http-proxy");
const dotenv = require("dotenv");
const configServers = require("./update-servers-job");

dotenv.config();

const run = async () => {
  const proxyServer = proxy.createProxyServer();
  const serverRouter = configServers(proxyServer).router;
  http
    .createServer(serverRouter)
    .listen(process.env.PORT, () =>
      console.log(`Proxy server is running in port ${process.env.PORT}`)
    );
};

run();
