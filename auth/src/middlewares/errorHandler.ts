import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/RequestValidationError";
import { DatabaseConnectionError } from "../errors/DatabaseConnectionError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    // const f = err.errors.map(error => { message: error.msg, field: '' } )

    return res
      .status(400)
      .json({ status: "fail", errors: err.serializeError() });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({ errors: err.serializeError() });
  }

  return res.status(400).json({ message: "something went very wrong" });
};
