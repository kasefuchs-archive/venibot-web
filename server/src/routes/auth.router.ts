import { RouteGroup } from "../interface";
import { Request, Response, Router } from "express";
import passport from "passport";
import config from "../config";
import { sign } from "jsonwebtoken";
import { AuthProfile } from "../middlewares/auth.middleware";
import Server from "../server";
import DiscordOAuth2 from "discord-oauth2";

export default class implements RouteGroup {
  readonly router: Router = Router();
  readonly route: string = "/auth";

  constructor(readonly server: Server) {
    this.router.get(
      "/",
      passport.authenticate("discord", {
        scope: ["identify", "guilds", "guilds.join"],
        prompt: "none",
      })
    );
    this.router.get(
      "/callback",
      passport.authenticate("discord", { failureRedirect: "/auth/" }),
      (req: Request, res: Response) =>
        res.redirect(
          `${config.frontendURI}callback?token=${sign(
            { accessToken: (req.user as AuthProfile).accessToken },
            config.session.secret as string
          )}`
        )
    );
    this.router.get("/add", (req: Request, res: Response) => {
      const { guild } = req.query;
      res.redirect(
        new DiscordOAuth2({
          version: "v9",
          clientId: config.discord.strategyOptions.clientID,
          redirectUri: config.discord.strategyOptions.callbackURL,
        }).generateAuthUrl({
          scope: [
            "identify",
            "guilds",
            "guilds.join",
            "bot",
            "applications.commands",
          ],
          guildId: guild as string | undefined,
          disableGuildSelect: guild !== undefined,
        })
      );
    });
    this.router.get("/support", (req: Request, res: Response) =>
      res.redirect(
        `https://discord.gg/${req.server.config.discord.supportInvite}`
      )
    );
  }
}
