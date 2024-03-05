console.log("Hi mum");

import * as BadRequestError from "../errors/BadRequestError";
import * as CustomError from "../errors/CustomError";
import * as DatabaseConnectionError from "../errors/DatabaseConnectionError";
import * as RequestValidationError from "../errors/RequestValidationError";
import * as NotFound from "../errors/NotFound";
import * as NotAuthorized from "../errors/NotAuthorized";

import * as currentUser from "../middlewares/currentUser";
import * as errorHandler from "../middlewares/errorHandler";
import * as requireAuth from "../middlewares/requireAuth";
import * as requestValidator from "../middlewares/requestValidator";
