import express, { Request, Response } from "express";

import { body } from "express-validator";

const router = express.Router();

router.get(
  "/signup",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage("password should contain at least 8 characters"),
  ],
  (req: Request, res: Response) => {
    res.send("hi mom");
  }
);

export { router as signupRouter };
