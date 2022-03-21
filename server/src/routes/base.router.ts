import { Router } from "express";
import base from "../controllers/base";
import { RouteGroup } from "../interface";
import Server from "../server";

export default class implements RouteGroup {
  readonly router: Router = Router();
  readonly route: string = "/";

  constructor(readonly server: Server) {
    this.router.get("/stats", base.stats);
  }
}
