import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { requestValidator } from "../middlewares/requestValidator";
import { User, UserType } from "../model/User";
import { BadRequestError } from "../errors/BadRequestError";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Please supply a valid email"),

    body("password").trim().isEmpty().withMessage("Please supply a password"),
  ],

  requestValidator,

  async (req: Request, res: Response) => {
    const { email, password }: UserType = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("Invalid signin credentials");
    }

    const isCorrectPassword = await Password.compare(
      existingUser.password,
      password
    );

    if (!isCorrectPassword) {
      throw new BadRequestError("Invalid login credentials");
    }

    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).json({ status: "success", user: existingUser });
  }
);

export { router as signinRouter };
