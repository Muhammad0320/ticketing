import { randomBytes } from "crypto";
import nats, { Message } from "node-nats-streaming";

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection close!");

    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("orderService");

  const subscription = stan.subscribe(
    "ticket:created",
    "OrderServiceQueueGroup",
    options
  );

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    typeof data === "string" &&
      console.log(`Event #${msg.getSequence()} received with data : ${data} `);

    msg.ack();
  });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
