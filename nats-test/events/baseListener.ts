import { Message, Stan } from "node-nats-streaming";

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
