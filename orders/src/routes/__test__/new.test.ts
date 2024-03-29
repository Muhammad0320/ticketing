import mongoose from "mongoose";
import { app } from "../../app";
import supertest from "supertest";
import { Ticket } from "../../model/tickets";
import { Order, OrderStatus } from "../../model/order";
import { natsWrapper } from "../../../natsWrapper";

it("returns an error if ticket does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId();

  await supertest(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId })
    .expect(404);
});

it("returns an error if the ticket is alrealy reserved", async () => {
  const ticket = await Ticket.build({
    title: "convcert",
    price: 33,
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
  });

  await Order.build({
    ticket,
    status: OrderStatus.Created,
    userId: "nrjnrignrigr",
    expiresAt: new Date(),
    version: 0,
  });

  await supertest(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticket: ticket.id })
    .expect(400);
});

it("reserves a ticket", async () => {
  const ticket = await Ticket.build({
    price: 20,
    title: "football",
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
  });

  await supertest(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticket: ticket.id })
    .expect(201);
});

it("emits an order created event", async () => {
  const ticket = await Ticket.build({
    title: "convcert",
    price: 33,
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
  });

  await supertest(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticket: ticket.id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
