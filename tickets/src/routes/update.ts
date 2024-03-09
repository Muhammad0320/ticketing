import { requireAuth } from "@m0ticketing/common";
import express, { Request, Response } from "express";

const router = express.Router();

router.put("/", requireAuth, async (req: Request, res: Response) => {});

export { router as updateTicketRouter };
