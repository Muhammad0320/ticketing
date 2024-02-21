import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("An error occured", err);

  res.status(400).json({ message: "something went very wrong" });
};
