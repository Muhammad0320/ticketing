import { Subjects } from "./subjects";
import { OrderStatus } from "./types/OrderStatus";

// I love writing shit

export interface OrderCreatedEvent {
  subjects: Subjects.OrderCreated;

  data: {
    id: number;
    userId: string;
    status: OrderStatus.Created;
    expiresAt: string;

    ticket: {
      id: string;
      price: number;
    };
  };
}
