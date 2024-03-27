import { OrderCancelledEvent, OrderStatus } from "@m0ticketing/common";
import { natsWrapper } from "../../../../natsWrapper";
import { OrderCancelledListener } from "../OrderCancelledListener";
import mongoose from "mongoose";
import { Ticket } from "../../../../model/tickets";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = new mongoose.Types.ObjectId().toHexString();

  const ticket = await Ticket.buildTickets({
    userId: "shittt",
    price: 22,
    title: "concert",
  });

  ticket.set({ orderId: orderId });

  await ticket.save();

  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: 0,
    status: OrderStatus.Cancelled,
    ticket: { id: ticket.id },
  };

  // @ts-ignore

  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, orderId, ticket, data, msg };
};

it("cretes , updated and published a ticket updated event", async () => {
  const { listener, orderId, ticket, data, msg } = await setup();

  const updatedTicket = await Ticket.findById(data.ticket.id);

  await listener.onMesage(data, msg);

  expect(updatedTicket?.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
