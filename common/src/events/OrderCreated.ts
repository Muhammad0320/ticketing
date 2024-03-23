import { Subjects } from "./subjects";
import { OrderStatus } from "./types/OrderStatus";

export interface OrderCreated {
  subject: Subjects.OrderCreated;

  data: {
    id: number;
    userId: string;
    staus: OrderStatus.Created;
    expiresAt: string;

    ticket: {
      id: string;
      price: number;
    };
  };
}
