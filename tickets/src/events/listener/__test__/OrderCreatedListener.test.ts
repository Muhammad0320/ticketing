import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../../model/tickets";
import { natsWrapper } from "../../../../natsWrapper";
import { OrderCreatedListener } from "../OrderCreatedListener";
import { OrderCreatedEvent, OrderStatus } from "@m0ticketing/common";

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const ticket = await Ticket.buildTickets({
    userId: "shitt",
    title: "concert",
    price: 99,
  });

  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: "string",
    status: OrderStatus.Created,
    expiresAt: "shottt",

    version: 0,
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),

      price: 99,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { msg, data, ticket, listener };
};

it("sets the order Id of the ticket", async () => {
  const { msg, data, ticket, listener } = await setup();

  await listener.onMesage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);
});

it("acks the message", async () => {
  const { msg, data, listener } = await setup();

  await listener.onMesage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("publishes a ticket updated event", async () => {
  const { msg, data, listener } = await setup();

  await listener.onMesage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
