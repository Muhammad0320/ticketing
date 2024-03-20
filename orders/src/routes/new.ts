import { requestValidator, requireAuth } from "@m0ticketing/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";

const router = express.Router();

router.post(
  "/",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Valid ticketId must be provided"),
  ],
  requestValidator,
  (req: Request, res: Response) => {
    res.send({});
  }
);

export { router as newOrderRouter };
