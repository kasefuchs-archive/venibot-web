import { NextFunction, Request, Response } from "express";
import { AuthProfile } from "./auth.middleware";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { guild_id } = req.params;
  const me = (req.user! as AuthProfile).guilds?.find(
    ({ id }) => id === guild_id
  );
  if (!me || !((me.permissions & 0x8) === 0x8 || me.owner))
    return res.status(403).json({
      code: 403,
      message: "Forbidden",
    });
  next();
}
