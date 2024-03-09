import { NotAuthorized, NotFound, requireAuth } from "@m0ticketing/common";
import express, { Request, Response } from "express";
import { Ticket } from "../../model/tickets";
import { body } from "express-validator";

const router = express.Router();

router.put(
  "/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Please provide a valid title"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Please provide a price thats greater than 0"),
  ],
  async (req: Request, res: Response) => {
    const tickets = await Ticket.findById(req.params.id); //

    if (!tickets) {
      throw new NotFound();
    }

    if (tickets.userId !== req.currentUser.id) {
      throw new NotAuthorized();
    }
  }
);

export { router as updateTicketRouter };
