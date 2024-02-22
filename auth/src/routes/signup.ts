import express, { Request, Response } from "express";

import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../errors/DatabaseConnectionError";
import { RequestValidationError } from "../errors/RequestValidationError";

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage("password should contain at least 8 characters"),
  ],
  (req: Request, res: Response) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      throw new RequestValidationError(error.array());
    }

    console.log("creating user");

    throw new DatabaseConnectionError("Unable to connect to db");
  }
);

export { router as signupRouter };
