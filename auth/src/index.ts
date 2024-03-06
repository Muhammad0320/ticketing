import { app } from "./app";
import mongoose from "mongoose";

const port = 3000;
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("No jwt key found");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("No mongo uri found");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

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
