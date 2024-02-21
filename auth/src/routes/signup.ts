import express, { Request, Response } from "express";

import { body, validationResult } from "express-validator";

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
      return res.status(400).json(error.array());
    }

    console.log("creating user");
  }
);

export { router as signupRouter };
