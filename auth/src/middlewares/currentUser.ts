import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface UserPayload {
  id: string;
  email: string;
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
  } catch (error) {}

  next();
};
