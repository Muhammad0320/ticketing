import { Subjects } from "./subjects";
import { OrderStatus } from "./types/OrderStatus";

export interface OrderCancelledEvent {
  subjects: Subjects.OrderCancelled;

  data: {
    id: string;
    status: OrderStatus.Cancelled;
    version: number;

    ticket: {
      id: string;
    };
  };
}
