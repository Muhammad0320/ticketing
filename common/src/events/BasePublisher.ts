import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Events {
  subjects: Subjects;
  data: any;
}

export abstract class BasePublisher<T extends Events> {
  abstract subjects: T["subjects"];

  protected client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  async publish(data: T["data"]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subjects, JSON.stringify(data), (err) => {
        if (err) {
          reject(err);
        }

        console.log(`Sussessfully published ${this.subjects} Events`);
      });

      resolve();
    });
  }
}
