import { NextFunction, Request, Response } from "express";
import config from "../config";
import { TokenExpiredError, verify, VerifyErrors } from "jsonwebtoken";
import Collection from "@discordjs/collection";
import { GuildInfo, Profile } from "passport-discord";
import DiscordOAuth2 from "discord-oauth2";

const Users = new Collection<string, AuthProfile>();
export let users = Users;

export interface AuthProfile extends Profile {
  accessToken: string;
}

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ code: 401, message: 'Missing "Authorization" header' });
  }
  if (users.get(req.headers.authorization)) {
    const user = users.get(req.headers.authorization)!;
    try {
      user.guilds = (
        await new DiscordOAuth2().getUserGuilds(user.accessToken)
      ).map((guild) => {
        return {
          ...guild,
          owner: Boolean(guild.owner),
          permissions: Number(guild.permissions),
          icon: guild.icon as string | null,
        } as GuildInfo;
      });
    } catch {}
    req.user = user;
    return next();
  }
  verify(
    req.headers.authorization,
    config.session.secret as string,
    async (err: VerifyErrors | null, result) => {
      if (err) {
        res.status(498);
        switch (err.name) {
          case TokenExpiredError.name:
            return res.json({ code: 498, message: "Token Expired" });
          default:
            return res.json({ code: 498, message: "Token Invalid" });
        }
      }
      const user = await new DiscordOAuth2().getUser(result!.accessToken);
      const guilds = await new DiscordOAuth2().getUserGuilds(
        result!.accessToken
      );
      const profile: AuthProfile = {
        provider: "discord",
        accessToken: result!.accessToken,
        fetchedAt: new Date().toISOString(),
        displayName: `${user.username}#${user.discriminator}`,
        ...user,
        locale: user.locale as string,
        mfa_enabled: Boolean(user.mfa_enabled),
        verified: Boolean(user.verified),
        flags: Number(user.flags),
        banner: user.banner as string | null,
        accent_color: user.accent_color as number | null,
        avatar: user.avatar as string | null,
        email: user.email as string | undefined,
        guilds: guilds.map((guild) => {
          return {
            ...guild,
            owner: Boolean(guild.owner),
            permissions: Number(guild.permissions),
            icon: guild.icon as string | null,
          };
        }),
      };
      Users.set(req.headers.authorization!, profile);
      req.user = profile;
      next();
    }
  );
}
