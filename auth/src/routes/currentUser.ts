import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get("/currentUser", (req: Request, res: Response) => {
  if (!req.session?.jwt) {
    return res.status(404).json({ status: "fail", currentUser: null });
  }

  try {
    const currentUser = jwt.verify(req.session.jwt, process.env.JWT_KEY!);

    return res.status(200).json({ status: "success", currentUser });
  } catch (error) {
    return res.status(404).json({ status: "fail", currentUser: null });
  }
});

export { router as currentUserRouter };
