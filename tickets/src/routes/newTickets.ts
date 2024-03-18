import { body } from "express-validator";
import { Ticket } from "../../model/tickets";
import { natsWrapper } from "../../natsWrapper";
import express, { Request, Response } from "express";
import { requireAuth, requestValidator } from "@m0ticketing/common";
import { TicketCreatedPublisher } from "../events/publisher/TicketCreatedPublisher";

const router = express.Router();

router.post(
  "/",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Please provide a valid title"),

    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Please provide a valid price"),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const id = req.currentUser!.id;

    const newTicket = await Ticket.buildTickets({
      title,
      price,
      userId: id,
    });

    new TicketCreatedPublisher(natsWrapper.client).publish({
      id: newTicket.id,
      price: newTicket.price,
      title: newTicket.title,
      userId: newTicket.userId,
    });

    res.status(201).json({ status: "success", json: newTicket });
  }
);
