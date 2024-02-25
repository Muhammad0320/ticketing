import express, { Request, Response } from "express";

import { body, validationResult } from "express-validator";

import { RequestValidationError } from "../errors/RequestValidationError";
import { User } from "../model/User";
import { BadRequestError } from "../errors/BadRequestError";

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
  async (req: Request, res: Response) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      throw new RequestValidationError(error.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError(
        "This email is in use, Please try with a different email"
      );
    }
  }
);

export { router as signupRouter };
