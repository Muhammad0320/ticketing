import express, { Request, Response } from "express";

const router = express.Router();

router.get("/:orderId", (req: Request, res: Response) => {
  res.send({});
});

export { router as showOrderRouter };
