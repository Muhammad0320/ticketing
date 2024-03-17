import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Events {
  subjects: Subjects;
  data: any;
}

export abstract class BasePublisher<T extends Events> {
  abstract subjects: T["subjects"];

  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T["data"]) {
    this.client.publish(this.subjects, data, () => {
      console.log(`Sussessfully published ${this.subjects} Events`);
    });
  }
}
