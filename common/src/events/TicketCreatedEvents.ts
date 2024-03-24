import { Subjects } from "./subjects";

export interface TicketCreatedEvent {
  subjects: Subjects.TicketCreated;

  data: {
    id: string;
    version: number;

    price: number;
    title: string;
    userId: string;
  };
}
