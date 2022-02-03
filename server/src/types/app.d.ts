declare namespace Express {
  import Server from "../server";
  export interface Request {
    server: Server;
  }
}
