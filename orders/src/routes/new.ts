import {
  BadRequestError,
  NotFound,
  OrderStatus,
  requestValidator,
  requireAuth,
} from "@m0ticketing/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Order } from "../model/order";
import { Ticket } from "../model/tickets";

const EXPIRATION_WINDOWS_TIMEOUT = 15 * 60;

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
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new NotFound();
    }

    const isReserved = await ticket.isReserved();

    if (isReserved) {
      throw new BadRequestError("This Ticket is already reserved");
    }

    const expiration = new Date();

    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOWS_TIMEOUT);

    // Build the Order

    const order = await Order.build({
      ticket,
      userId: req.currentUser!.id,
      expiresAt: expiration,
      status: OrderStatus.Created,
    });

    res.status(201).json({
      status: "success",

      data: order,
    });
  }
);

export { router as newOrderRouter };
