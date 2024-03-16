import { Message } from "node-nats-streaming";
import { Listener } from "./baseListener";
import { TickeetCreatedEvent } from "./TicketCreatedEvents";
import { Subjects } from "./subjects";

export class TickedCreatedListener extends Listener<TickeetCreatedEvent> {
  readonly subjects = Subjects.TicketCreated;

  queueGroupName = "paymentService";

  onMesage(data: any, msg: Message): void {
    console.log(`Event recieved!: ${data}`);

    msg.ack();
  }
}
