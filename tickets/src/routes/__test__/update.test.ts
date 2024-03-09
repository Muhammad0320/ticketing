import mongoose from "mongoose";
import supertest from "supertest";
import { app } from "../../app";

it("return a 404 if the id is not valid", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await supertest(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({ title: "nrjvnrjvbr", price: 23 })
    .expect(404);
});

it("return a 401, if the user is nit authroized", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await supertest(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "nrjvnrjvbr", price: 23 })
    .expect(401);
});
