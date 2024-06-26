import supertest from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { OrderStatus } from "@m0ticketing/common";
import { Order } from "../../models/order";
import { stripe } from "../../stripe";
import { Payment } from "../../models/payment";

jest.mock("../../__mocks__/stripe.ts");

it("return a 404 when user tries to pay for an order that doesn't exist", async () => {
  await supertest(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      orderId: new mongoose.Types.ObjectId().toHexString(),
      token: "jrnjrgbjgbgbjgrbj",
    })
    .expect(404);
});

it("returns a 401 when purchasing an order that does not belong to the user", async () => {
  const { body } = await supertest(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      userId: new mongoose.Types.ObjectId().toHexString(),
      version: 0,
      price: 99,
      status: OrderStatus.Created,
      id: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(201);

  await supertest(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({ orderId: body.id, token: "neifeifeni" })
    .expect(401);
});

it("returns a 400 when purchasing an item with cancelled status", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();

  const order = await Order.buildOrder({
    userId,
    version: 0,
    price: 99,
    status: OrderStatus.Created,
    id: new mongoose.Types.ObjectId().toHexString(),
  });

  order.set({ status: OrderStatus.Cancelled });

  await order.save();

  await supertest(app)
    .post("api/payments")
    .set("Cookie", global.signin(userId))
    .send({ order: order.id, token: "neifeifeni" })
    .expect(400);
});

it("returns a 201 when user purchase with valis inputs", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();

  const order = await Order.buildOrder({
    userId,
    version: 0,
    price: 99,
    status: OrderStatus.Created,
    id: new mongoose.Types.ObjectId().toHexString(),
  });

  await supertest(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({ token: "tok_visa", orderId: order.id })
    .expect(201);

  const chargeOption = (stripe.charges.create as jest.Mock).mock.calls[0][0];

  expect(chargeOption.source).toEqual("tok_visa");
  expect(chargeOption.amount).toEqual(99 * 100);
  expect(chargeOption.currency).toEqual("usd");

  const payment = await Payment.findOne({
    orderId: order.id,
    stripeId: chargeOption!.id,
  });

  expect(payment).not.toBeNull();
});
