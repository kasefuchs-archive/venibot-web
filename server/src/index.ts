import Server from "./server";
import config from "./config";
import { createConnection } from "typeorm";
import { banner } from "./assets";

process.on("unhandledRejection", console.error);
const server = new Server(config);

server.app.listen(
  config.server.port || 8080,
  config.server.hostname,
  async () => {
    server.orm = await createConnection(config.orm);
    banner(server);
  }
);
