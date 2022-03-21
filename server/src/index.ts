import config from "./config";
import Server from "./server";

process.on("unhandledRejection", console.error);
new Server(config).start();
