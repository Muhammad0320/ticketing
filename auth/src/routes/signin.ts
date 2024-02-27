import express, { Request, Response } from "express";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Please supply a valid email"),

    body("password").trim().isEmpty().withMessage("Please supply a password"),
  ],
  (req: Request, res: Response) => {}
);

export { router as signinRouter };
