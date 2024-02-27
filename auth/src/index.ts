import express from "express";
import "express-async-errors";
import { NotFound } from "./errors/NotFound";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { currentUserRouter } from "./routes/currentUser";
import { errorHandler } from "./middlewares/errorHandler";
import mongoose from "mongoose";

import cookieSession from "cookie-session";

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(cookieSession({ httpOnly: true, signed: false, secure: true }));

console.log("Hi mom");

const rootUserUrl = "/api/users";

app.use(rootUserUrl, signupRouter);
app.use(rootUserUrl, signinRouter);
app.use(rootUserUrl, signoutRouter);

app.use(rootUserUrl, currentUserRouter);

app.all("*", (req, res) => {
  throw new NotFound();
});

app.use(errorHandler);

const port = 3000;

const start = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("No jwt_secrect found");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");

    console.log("Connected to mongoDB");
  } catch (err) {
    console.error(err);
  }

  app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
};

start();

// muhammawwal@1123

export default app;
