import { NextFunction, Request, Response } from "express";
import { GuildInfo } from "passport-discord";
import { AuthProfile } from "../middlewares/auth.middleware";
import { Guild } from "../entities";
import { In } from "typeorm";
import axios from "axios";
import commands from "../assets/commands.json";
import { Routes } from "discord-api-types/v9";

interface ConfigData {
  audit_enabled: boolean;
  timezone: string;
  command_locale: string;
  locale: string;
}

interface ConfigPayload {
  new_data: ConfigData;
  old_data: ConfigData;
}

export default class Servers {
  public static async index(req: Request, res: Response, _next: NextFunction) {
    const user: AuthProfile = req.user as AuthProfile;
    const guilds = user.guilds!.filter(
      (guild) => (guild.permissions & 0x8) === 0x8 || guild.owner
    );
    const db_data: Guild[] = await req.server.orm?.getRepository(Guild).find({
      where: { id: In(guilds.map((guild) => guild.id)) },
    });
    const data = guilds.map((guild: GuildInfo) => {
      const guild_in_db = db_data.find((i) => i.id === guild.id);
      return {
        ...guild,
        active: guild_in_db?.active ?? false,
      };
    });
    return res.json(data);
  }

  public static async getConfig(
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const { guild_id } = req.params;
    try {
      const guild: Guild = await req.server.orm
        .getRepository(Guild)
        .findOneOrFail(guild_id, {
          select: ["command_locale", "locale", "timezone", "audit_enabled"],
        });
      res.json(guild);
    } catch {
      res.status(404).json({ code: 404, message: "Guild Not Found" });
    }
  }

  public static async updateConfig(
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const { guild_id } = req.params;
    const { new_data, old_data } = req.body as ConfigPayload;
    try {
      if (new_data.command_locale !== old_data.command_locale) {
        axios
          .put(
            `https://discord.com/api/v9${Routes.applicationGuildCommands(
              req.server.config.discord.strategyOptions.clientID,
              guild_id
            )}`,
            commands[new_data.command_locale as keyof typeof commands],
            {
              headers: {
                authorization: `Bot ${req.server.config.discord.botToken}`,
              },
            }
          )
          .then(async () => {
            await req.server.orm
              .getRepository(Guild)
              .update(guild_id, new_data);
            res.status(200).json({ code: 200, message: "Success" });
          })
          .catch(() => {
            res.status(400).json({ code: 400, message: "Bad Request" });
          });
      } else {
        await req.server.orm.getRepository(Guild).update(guild_id, new_data);
        res.status(200).json({ code: 200, message: "Success" });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ code: 400, message: "Bad Request" });
    }
  }

  public static getGuild(req: Request, res: Response, _next: NextFunction) {
    const { guild_id } = req.params;
    res.json((req.user as AuthProfile).guilds?.find((i) => i.id === guild_id));
  }
}
