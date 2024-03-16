import { Message } from "node-nats-streaming";
import { Listener } from "./baseListener";

export class TickedCreatedListener extends Listener {
  subjects = "ticket:created";

  queueGroupName = "paymentService";

  onMesage(data: any, msg: Message): void {
    console.log(`Event recieved!: ${data}`);

    msg.ack();
  }
}
