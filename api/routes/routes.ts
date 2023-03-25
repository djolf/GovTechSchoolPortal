import * as express from "express";
import * as bodyParser from "body-parser";
import { Logger } from "../logger/logger";
import { body, validationResult } from "express-validator";
import { isLevel, isValidPhoneNumber } from "../validation/validation";

class Routes {
  public express: express.Application;
  public logger: Logger;

  // array to hold teachers
  teachers: Teacher[];
  classes: Class[];

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.logger = new Logger();
    this.teachers = [
      {
        name: "Mary",
        subject: Subject.MA,
        email: "teachermary@gmail.com",
        contactNumber: "68129414",
      },
      {
        name: "Ken",
        subject: Subject.MT,
        email: "teacherken@gmail.com",
        contactNumber: "61824191",
      },
    ];
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {

    // request to get all the teachers
    this.express.get("/teachers", (req, res) => {
      this.logger.info("url:::::::" + req.url);
      res.status(200).json(this.teachers);
    });

    // create teacher
    this.express.post(
      "/teachers",
      body("name").isString().notEmpty(),
      body("subject").isString().notEmpty(),
      body("email").isEmail().notEmpty(),
      body("contactNumber").notEmpty().custom(isValidPhoneNumber),
      (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          this.logger.info("Creating teacher: " + req.body);
          this.teachers.push(req.body);
          res.sendStatus(201);
        } else {
          this.logger.error("Error creating teacher: " + errors);
          return res.status(400).json({ errors: errors.array() });
        }
      }
    );

    // add class
    this.express.post(
      "/classes",
      body("level").notEmpty().custom(isLevel),
      body("name").notEmpty().isString(),
      body("teacherEmail").notEmpty().isEmail(),
      (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          this.logger.info("Creating class: " + req.body);
          this.classes.push(req.body);
          res.sendStatus(201);
        } else {
          this.logger.error("Error creating class: " + errors);
          return res.status(400).json({ errors: errors.array() });
        }
      }
    );

    // get classes
    this.express.get("classes", (req, res) => {
      this.logger.info("url:::::::" + req.url);
      res.status(200).json(this.classes);
    })
  }
}

export default new Routes().express;
