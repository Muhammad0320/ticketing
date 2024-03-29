import { app } from "../../app";
import supertest from "supertest";
import { Ticket } from "../../model/tickets";
import { OrderStatus } from "../../model/order";
import { natsWrapper } from "../../../natsWrapper";
import mongoose from "mongoose";

it("cancells an order", async () => {
  const ticket = await Ticket.build({
    price: 99,
    title: "Hajj",
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
  });

  const user = global.signin();

  const { body: order } = await supertest(app)
    .post("/api/order")
    .set("Cookie", user)
    .send({ ticket: ticket.id })
    .expect(201);

  await supertest(app)
    .delete(`/api/order${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  const { body: orderResponse } = await supertest(app)
    .get(` /api/order${order.id} `)
    .set("Cookie", user)
    .send({})
    .expect(200);

  expect(orderResponse.status).toEqual(OrderStatus.Cancelled);
});

it("emits an event when order is cancelled", async () => {
  const ticket = await Ticket.build({
    price: 999,
    title: "Hajj",
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
  });

  const user = global.signin();

  const { body: order } = await supertest(app)
    .post("/api/order")
    .set("Cookie", user)
    .send({ ticket: ticket.id })
    .expect(201);

  await supertest(app)
    .delete(`/api/order${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
