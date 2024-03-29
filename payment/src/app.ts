import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { NotFound, currentUser, errorHandler } from "@m0ticketing/common";

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(
  cookieSession({
    httpOnly: true,
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

console.log("Hi mom");

app.use(currentUser);

const rootUrl = "/api/payment";

app.all("*", (req, res) => {
  throw new NotFound();
});

app.use(errorHandler);

export { app };
