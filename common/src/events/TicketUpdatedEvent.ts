import { Subjects } from "./subjects";

export interface TicketUpdatedEvent {
  subjects: Subjects.TicketUpdated;

  data: {
    id: string;
    title: string;
    version: number;
    price: number;
    orderId?: string;
    userId: string;
  };
}
