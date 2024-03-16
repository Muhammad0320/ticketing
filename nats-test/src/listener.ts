import { randomBytes } from "crypto";
import nats, { Message, Stan } from "node-nats-streaming";

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

export abstract class Listener {
  abstract subjects: string;
  abstract queueGroupName: string;
  abstract onMesage(data: any, msg: Message): void;

  private client: Stan;

  protected ackWait: number = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subsciptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subjects,
      this.queueGroupName,
      this.subsciptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(
        `Message recieved ${this.subjects} / ${this.queueGroupName}  `
      );

      const message = this.parseMessage(msg); //

      this.onMesage(message, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();

    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
