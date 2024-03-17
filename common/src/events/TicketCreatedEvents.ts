import { Subjects } from "./subjects";

export interface TicketCreatedEvent {
  subjects: Subjects.TicketCreated;

  data: {
    id: string;
    price: number;
    title: string;
    userId: string;
  };
}
