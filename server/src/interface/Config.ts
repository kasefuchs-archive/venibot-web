import { StrategyOptions } from "passport-discord";
import { SessionOptions } from "express-session";
import { ConnectionOptions } from "typeorm";

export interface Config {
  discord: {
    supportInvite: string;
    botToken: string;
    strategyOptions: StrategyOptions;
  };
  session: SessionOptions;
  server: {
    port?: number;
    hostname: string;
    environment?: "development" | "production";
  };
  frontendURI: string;
  orm: ConnectionOptions;
}
