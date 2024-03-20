import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { NotFound, currentUser, errorHandler } from "@m0ticketing/common";
import { indexOrderRouter } from "./routes";
import { showOrderRouter } from "./routes/show";
import { deleteOrderRouter } from "./routes/delete";
import { newOrderRouter } from "./routes/new";

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

const baseUrl = "/api/orders";

app.use(baseUrl);

app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.all("*", (req, res) => {
  throw new NotFound();
});

app.use(errorHandler);

export { app };
