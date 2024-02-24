import express from "express";
import "express-async-errors";
import { NotFound } from "./errors/NotFound";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { currentUserRouter } from "./routes/currentUser";
import { errorHandler } from "./middlewares/errorHandler";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

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
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");

    console.log("Connected to mongoDB");

    app.listen(port, () => {
      console.log(`Listening on port ${port}!`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();

// muhammawwal@1123

export default app;
