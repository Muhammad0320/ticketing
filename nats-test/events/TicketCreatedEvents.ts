import { Subjects } from "./subjects";

export interface TickeetCreatedEvent {
  Subjects: Subjects.TicketCreated;

  data: {
    id: string;
    title: string;
    price: number;
  };
}
