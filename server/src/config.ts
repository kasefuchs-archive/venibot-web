import { Config } from "./interface/Config";
import * as Entities from "./entities";
import dotenv from "dotenv";
import path from "path";
import { ConnectionOptions } from "typeorm";

dotenv.config({
  path: path.join(__dirname, "..", ".env"),
});

const config = (): Config => {
  const dbConnectionString = process.env.TYPEORM_URL!;
  const type = dbConnectionString.includes("://")
    ? dbConnectionString.split(":")[0]?.replace("+srv", "")
    : "sqlite";
  const isSqlite: boolean = type.includes("sqlite");
  return {
    discord: {
      supportInvite: process.env.DISCORD_SUPPORT_SERVER!,
      botToken: process.env.DISCORD_BOT_TOKEN!,
      strategyOptions: {
        clientID: process.env.DISCORD_CLIENT_ID!,
        clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        callbackURL: process.env.DISCORD_CALLBACK_URL!,
        scope: ["identify", "guilds", "guilds.join"],
      },
    },
    session: {
      secret: process.env.APP_KEY!,
      name: "session",
      saveUninitialized: false,
      resave: true,
      cookie: {
        httpOnly: true,
        maxAge: 6048e8,
      },
    },
    server: {
      port: Number(process.env.PORT || 8080),
      hostname: process.env.HOST || "127.0.0.1",
      environment: (process.env.NODE_ENV ||
        "development") as Config["server"]["environment"],
    },
    frontendURI: process.env.FRONTEND_URL!,
    orm: {
      type: type as any,
      url: isSqlite ? undefined : dbConnectionString,
      database: isSqlite ? dbConnectionString : undefined,
      entities: Object.values(Entities).filter(
        (entity) => entity.constructor.name !== "Object" && entity.name
      ),
      synchronize: type !== "mongodb",
      logging: false,
      cache: {
        duration: 1000 * 3,
      },
      bigNumberStrings: false,
      supportBigNumbers: true,
      name: "default",
    },
  };
};
export default config();
