import { NotAuthorized, NotFound, requireAuth } from "@m0ticketing/common";
import express, { Request, Response } from "express";
import { Ticket } from "../../model/tickets";

const router = express.Router();

router.put("/:id", requireAuth, async (req: Request, res: Response) => {
  const tickets = await Ticket.findById(req.params.id); //

  if (!tickets) {
    throw new NotFound();
  }

  if (tickets.userId !== req.currentUser.id) {
    throw new NotAuthorized();
  }
});

export { router as updateTicketRouter };
