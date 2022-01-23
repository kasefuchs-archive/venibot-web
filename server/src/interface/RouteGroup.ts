import { Router } from "express";
import Server from "../server";

export interface RouteGroup {
  readonly router: Router;
  readonly route: string;
  readonly server: Server;
}
