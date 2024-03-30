import supertest from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { OrderStatus } from "@m0ticketing/common";

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
