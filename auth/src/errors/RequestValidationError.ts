import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  constructor(public reasons: ValidationError[]) {
    super();

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
