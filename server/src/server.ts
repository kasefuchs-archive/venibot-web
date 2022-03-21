import cors from "cors";
import EventEmitter from "events";
import express, { Application, NextFunction, Request, Response } from "express";
import { ValidationError } from "express-json-validator-middleware";
import session from "express-session";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import { Profile, Strategy } from "passport-discord";
import {DataSource} from "typeorm";
import banner from "./assets/banner.json";
import { RouteGroup } from "./interface";
import { Config } from "./interface/Config";
import { getFilesWithKeyword } from "./utils";

export class Server extends EventEmitter {
  public app: Application;
  public dataSource?: DataSource;

  constructor(public readonly config: Config) {
    super();
    this.app = express();
    this.init();
  }

  private init() {
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj: any, done) => done(null, obj));
    passport.use(
      new Strategy(
        this.config.discord.strategyOptions,
        (accessToken: string, refreshToken: string, profile: Profile, done) =>
          process.nextTick(() => done(null, profile))
      )
    );
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      req.server = this;
      next();
    });
    this.app.use(session(this.config.session));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.set("json spaces", 4);
    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: true }));
    if (this.config.server.environment === "development") {
      this.app.use(morgan("dev"));
      this.app.use(cors());
    } else if (this.config.server.environment === "production") {
      this.app.use(helmet());
    }
    this.app.use(
      [/(.*)\.(js|ts)$/, "/assets"],
      express.static(__dirname + "/assets")
    );
    getFilesWithKeyword("router", __dirname + "/routes").forEach(
      (file: string) => {
        const { route, router }: RouteGroup = new (require(file).default)(
          Server
        );
        this.app.use(route, router);
      }
    );
    this.app.use(
      (
        err: Error | ValidationError,
        req: Request,
        res: Response,
        _next: NextFunction
      ) => {
        if (err.name === "JsonSchemaValidationError") {
          return res.status(400).json({
            code: 400,
            ...err,
          });
        } else {
          return res.status(500).json({
            error: err.name,
            message: err.message,
            code: 500,
          });
        }
      }
    );
    this.on("ready", async () => {
      console.clear();
      console.log(`\n${banner.join("\n")}\n`);
      console.log(`Port        :: ${this.config.server.port}`);
      console.log(`Database    :: ${this.config.dataSource.type}`);
      console.log(`Environment :: ${this.config.server.environment}`);
    });
  }

  async start() {
    this.dataSource = await new DataSource(this.config.dataSource).initialize();
    this.app.listen(
      this.config.server.port || 8080,
      this.config.server.hostname,
      () => this.emit("ready")
    );
  }
}

export default Server;
