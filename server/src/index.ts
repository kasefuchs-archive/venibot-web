import Server from "./server";
import config from "./config";
import { createConnection } from "typeorm";

process.on("unhandledRejection", console.error);
new Server(config).start();

