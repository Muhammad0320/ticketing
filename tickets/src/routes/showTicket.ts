import express, { Request, Response } from "express";
import { Ticket } from "../../model/tickets";
import { NotFound } from "@m0ticketing/common";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) new NotFound();

  res.status(200).json({ ticket });
});

export { router as showTicketRouter };
