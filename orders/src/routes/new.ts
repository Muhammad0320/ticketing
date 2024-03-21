import {
  BadRequestError,
  OrderStatus,
  requestValidator,
  requireAuth,
} from "@m0ticketing/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Order } from "../model/order";

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
  async (req: Request, res: Response) => {
    const { ticket } = req.params;

    const existingOrder = await Order.findOne({
      ticket,

      status: {
        $in: [
          OrderStatus.AwaitingPayment,
          OrderStatus.Created,
          OrderStatus.completed,
        ],
      },
    });

    if (existingOrder) {
      throw new BadRequestError("This Ticket is already reserved");
    }

    res.send({});
  }
);

export { router as newOrderRouter };
