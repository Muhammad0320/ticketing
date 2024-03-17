import { Subjects } from "./subjects";

export interface TicketUpdatedEvent {
  subjects: Subjects.TicketUpdated;

  data: {
    id: string;
    userId: string;
    title: string;
    price: number;
  };
}
