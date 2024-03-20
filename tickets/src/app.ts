import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { NotFound, errorHandler } from "@m0ticketing/common";
import { indexRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";
import { newTicketRouter } from "./routes/newTickets";
import { showTicketRouter } from "./routes/showTicket";

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

const rootUrl = "/api/tickets";

app.use(rootUrl, indexRouter);
app.use(rootUrl, newTicketRouter);
app.use(rootUrl, showTicketRouter);
app.use(rootUrl, updateTicketRouter);

app.all("*", (req, res) => {
  throw new NotFound();
});

app.use(errorHandler);

export { app };
