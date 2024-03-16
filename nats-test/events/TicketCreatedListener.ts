import { Message } from "node-nats-streaming";
import { Listener } from "./baseListener";
import { TicketCreatedEvent } from "./TicketCreatedEvents";
import { Subjects } from "./subjects";

export class TickedCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subjects = Subjects.TicketCreated;

  queueGroupName = "paymentService";

  onMesage(data: TicketCreatedEvent["data"], msg: Message): void {
    console.log(`Event recieved!: ${data}`);

    console.log(data.id);

    msg.ack();
  }
}
