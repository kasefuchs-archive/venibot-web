import { RouteGroup } from "../interface";
import { Router } from "express";
import servers from "../controllers/servers";
import AuthMiddleware from "../middlewares/auth.middleware";
import GuildPermissionsMiddleware from "../middlewares/guild_permissions.middleware";
import Server from "../server";
import { Validator } from "express-json-validator-middleware";
import { JSONSchema7 } from "json-schema";
import { ModifyGuildSchema } from "./../assets/schemas.json";

const { validate } = new Validator({});

export default class implements RouteGroup {
  readonly router: Router = Router();
  readonly route: string = "/servers";

  constructor(readonly server: Server) {
    this.router.get("/", AuthMiddleware, servers.index);
    this.router.get(
      "/:guild_id",
      AuthMiddleware,
      GuildPermissionsMiddleware,
      servers.getGuild
    );
    this.router.get(
      "/:guild_id/config",
      AuthMiddleware,
      GuildPermissionsMiddleware,
      servers.getConfig
    );
    this.router.patch(
      "/:guild_id/config",
      AuthMiddleware,
      GuildPermissionsMiddleware,
      validate({ body: ModifyGuildSchema as JSONSchema7 }),
      servers.updateConfig
    );
  }
}
