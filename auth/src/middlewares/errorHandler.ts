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
    const formattedErrors = err.errors.map((error) => {
      if (error.type === "field") {
        return {
          message: error.msg,
          field: error.path,
        };
      }
    });

    // const f = err.errors.map(error => { message: error.msg, field: '' } )

    return res.status(400).json({ status: "fail", errors: formattedErrors });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({ errors: [{ message: err.reasons }] });
  }

  return res.status(400).json({ message: "something went very wrong" });
};
