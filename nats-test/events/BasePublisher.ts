import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Events {
  subjects: Subjects;
  data: any;
}

export abstract class BasePublisher<T extends Events> {
  abstract subjects: Subjects;

  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(subject: T["subjects"], data: T["data"]) {
    this.client.publish(subject, data, () => {
      console.log(`Sussessfully published ${subject} Events`);
    });
  }
}
