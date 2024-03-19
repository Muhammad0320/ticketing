import { app } from "./app";
import mongoose from "mongoose";
import { natsWrapper } from "../natsWrapper";

const port = 3000;
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("No jwt key found");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("No mongo uri found");
  }

  if (!process.env.NATS_URL) {
    throw new Error("No NATS_URL found");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("No NATS_CLUSTER_ID found");
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("No NATS_CLIENT_ID)  found");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    // new TickedCreatedListener(natsWrapper.client).listen();

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
