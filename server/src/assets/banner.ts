import Server from "../server";

export const banner = (server: Server) => {
  console.log(`VB-Api server started at port: ${server.config.server.port}`);
  console.log(`Server environment: ${server.config.server.environment}`);
};
