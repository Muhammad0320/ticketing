import { app } from "./app";
import mongoose from "mongoose";

const port = 3000;
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("No jwt key found");
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
