import { natsWrapper } from "../natsWrapper";
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
    await natsWrapper.connect("ticketing", "shitt", "http://nats-srv:4222");

    natsWrapper.client.on("close", () => {
      console.log("NATS connection close!");

      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

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
