import { Stan } from "node-nats-streaming";
import nats from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  connect(clusterId: string, clientId: string, url: string): Promise<void> {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise((resolve, reject) => {
      this._client!.on("connect", () => {
        console.log("Connected to NATS");

        resolve();
      });

      this._client!.on("error", (error: any) => {
        console.log("Unable to connect to NATS");

        reject(error);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
