import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/RequestValidationError";
import { DatabaseConnectionError } from "../errors/DatabaseConnectionError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof RequestValidationError) {
    console.log("I'm an instance of request validation error");
  }

  if (err instanceof DatabaseConnectionError) {
    console.log("I'm an instance of  database connection error");
  }

  res.status(400).json({ message: "something went very wrong" });
};
