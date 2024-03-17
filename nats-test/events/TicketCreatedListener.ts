import { Listener, Subjects, TicketCreatedEvent } from "@m0ticketing/common";
import { Message } from "node-nats-streaming";

export class TickedCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subjects = Subjects.TicketCreated;

  queueGroupName = "paymentService";

  onMesage(data: TicketCreatedEvent["data"], msg: Message): void {
    console.log(`Event recieved!: ${data}`);

    console.log(data.id);

    msg.ack();
  }
}
