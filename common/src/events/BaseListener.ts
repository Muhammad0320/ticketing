import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Events {
  subjects: Subjects;

  data: any;
}

export abstract class Listener<T extends Events> {
  abstract subjects: T["subjects"];
  abstract queueGroupName: string;
  abstract onMesage(data: T["data"], msg: Message): void;

  protected client: Stan;

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
