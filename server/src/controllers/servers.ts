import axios from "axios";
import { Routes } from "discord-api-types/v9";
import { NextFunction, Request, Response } from "express";
import { GuildInfo } from "passport-discord";
import { In } from "typeorm";
import commands from "../assets/commands.json";
import { Guild } from "../entities";
import { AuthProfile } from "../middlewares/auth.middleware";

interface ConfigData {
  audit_enabled: boolean;
  timezone: string;
  command_locale: string;
  locale: string;
}

export default class Servers {
  public static async index(req: Request, res: Response, _next: NextFunction) {
    const user: AuthProfile = req.user as AuthProfile;
    const guilds = user.guilds!.filter(
      ({ permissions, owner }) => (permissions & 0x8) === 0x8 || owner
    );
    const db_data: Guild[] = await req.server.dataSource?.getRepository(Guild).find({
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
      const guild: Guild = await req.server.dataSource
        .getRepository(Guild)
        .findOneOrFail(guild_id, {
          select: [
            "command_locale",
            "locale",
            "timezone",
            "audit_enabled",
            "prefix",
          ],
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
    const data = req.body as ConfigData;
    try {
      const initialData = await req.server.dataSource
        .getRepository(Guild)
        .findOneOrFail(guild_id);
      await req.server.dataSource.getRepository(Guild).update(guild_id, data);
      if (initialData.command_locale !== data.command_locale) {
        await axios.put(
          `https://discord.com/api/v9${Routes.applicationGuildCommands(
            req.server.config.discord.strategyOptions.clientID,
            guild_id
          )}`,
          commands.map((command) => ({
            ...command,
            name: command.name[
              data.command_locale as keyof typeof command.name
            ],
            description:
              command.description[
                data.command_locale as keyof typeof command.description
              ],
            options: command.options
              ? command.options.map((option) => ({
                  ...option,
                  type: option.type,
                  description:
                    option.description[
                      data.command_locale as keyof typeof option.description
                    ],
                }))
              : undefined,
          })),
          {
            headers: {
              authorization: `Bot ${req.server.config.discord.botToken}`,
            },
          }
        );
      }
      res.status(200).json({ code: 200, message: "Success" });
    } catch (e) {
      console.log(JSON.stringify((<any>e).response.data.errors, null, 2));
      res.status(400).json({ code: 400, message: "Bad Request" });
    }
  }

  public static getGuild(req: Request, res: Response, _next: NextFunction) {
    const { guild_id } = req.params;
    res.json((req.user as AuthProfile).guilds?.find((i) => i.id === guild_id));
  }
}
