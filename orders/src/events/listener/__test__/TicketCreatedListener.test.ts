import { TicketCreatedEvent } from "@m0ticketing/common";
import { natsWrapper } from "../../../../natsWrapper";
import { TicketCreatedListener } from "../TicketCreatedListener";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new TicketCreatedListener(natsWrapper.client);

  const data: TicketCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 33,
    title: "concert",
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("Creates and saves a new ticket");

it("calls the ack function");
