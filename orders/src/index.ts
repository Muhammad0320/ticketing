import { app } from "./app";
import mongoose from "mongoose";
import { natsWrapper } from "../natsWrapper";
import { TicketCreatedListener } from "./events/listener/TicketCreatedListener";
import { TicketUpdatedListener } from "./events/listener/TicketUpdatedListener";
import { ExpirationCompletedListener } from "./events/listener/ExpirationCompleteListener";

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

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();
    new ExpirationCompletedListener(natsWrapper.client).listen();

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
