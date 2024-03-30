import supertest from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

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
