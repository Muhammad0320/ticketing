import { OrderCreatedEvent, OrderStatus } from "@m0ticketing/common";
import { Ticket } from "../../../../model/tickets";
import { natsWrapper } from "../../../../natsWrapper";
import { OrderCreatedListener } from "../OrderCreatedListener";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

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
