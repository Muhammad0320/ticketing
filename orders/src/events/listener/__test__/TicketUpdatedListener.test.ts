import mongoose from "mongoose";
import { natsWrapper } from "../../../../natsWrapper";
import { Ticket } from "../../../model/tickets";
import { TicketUpdatedListener } from "../TicketUpdatedListener";
import { TicketUpdatedEvent } from "@m0ticketing/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new TicketUpdatedListener(natsWrapper.client);

  const ticket = await Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 99,
  });

  const data: TicketUpdatedEvent["data"] = {
    price: 999,
    id: ticket.id,
    version: ticket.version + 1,
    title: "new concert",
    userId: "shitttt",
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it("finds update and saves a ticket", async () => {});

it("acks the messge", async () => {});
