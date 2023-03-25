import * as express from "express";
import * as bodyParser from "body-parser";
import { Logger } from "./logger/logger";
import Routes from './routes/routes';

class App {
  public express: express.Application;
  public logger: Logger;

  users: any[];

  constructor() {
    this.express = express();
    this.logger = new Logger();
    this.initMiddleware();
    this.routes();
    this.users = [
      { firstName: "fnam1", lastName: "lnam1", userName: "username1" },
    ];
  }

  private initMiddleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.get("/", (req, res) => {
      res.send("App is running!");
    });

    this.express.use('/api', Routes);

    // handle undefined routes
    this.express.use("*", (req, res) => {
      this.logger.error(":::::url::::::"+req.baseUrl);
      res.sendStatus(404);
    });
  }
}

export default new App().express;
