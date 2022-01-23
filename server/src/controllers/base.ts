import { NextFunction, Request, Response } from "express";
import { Guild, Member } from "../entities";

export default class Base {
  public static async stats(req: Request, res: Response, _next: NextFunction) {
    const guilds = await req.server.orm
      .getRepository(Guild)
      .count({ where: { active: true } });
    const users = await req.server.orm.getRepository(Member).count();
    res.json({
      guildCount: guilds,
      userCount: users,
    });
  }
}
