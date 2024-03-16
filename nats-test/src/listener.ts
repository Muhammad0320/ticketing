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

  new TickedCreatedListener(stan).listen();
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

class TickedCreatedListener extends Listener {
  subjects = "ticket:created";

  queueGroupName = "paymentService";

  onMesage(data: any, msg: nats.Message): void {
    console.log(`Event recieved!: ${data}`);

    msg.ack();
  }
}
