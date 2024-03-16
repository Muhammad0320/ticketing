import { Subjects } from "./subjects";

export interface TickeetCreatedEvent {
  subjects: Subjects.TicketCreated;

  data: {
    id: string;
    title: string;
    price: number;
  };
}
