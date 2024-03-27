import { OrderCancelledEvent, OrderStatus } from "@m0ticketing/common";
import { natsWrapper } from "../../../../natsWrapper";
import { OrderCancelledListener } from "../OrderCancelledListener";
import mongoose from "mongoose";
import { Ticket } from "../../../../model/tickets";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = new mongoose.Types.ObjectId().toHexString();

  const ticket = await Ticket.buildTickets({
    userId: "shittt",
    price: 22,
    title: "concert",
  });

  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: 0,
    status: OrderStatus.Cancelled,
    ticket: { id: ticket.id },
  };

  return { listener, orderId, ticket, data };
};
