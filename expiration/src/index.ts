import { OrderCreatedListener } from "../events/listener/OrderCreatedListener";
import { natsWrapper } from "../natsWrapper";

const start = async () => {
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

    new OrderCreatedListener(natsWrapper.client).listen();

    natsWrapper.client.on("close", () => {
      console.log("NATS connection close!");

      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    console.log("Connected to mongoDB");
  } catch (err) {
    console.error(err);
  }
};

start();

// muhammawwal@1123
