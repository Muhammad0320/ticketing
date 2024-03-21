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

    res.send({});
  }
);

export { router as newOrderRouter };
