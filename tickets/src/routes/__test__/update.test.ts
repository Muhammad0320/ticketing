import mongoose from "mongoose";
import supertest from "supertest";
import { app } from "../../app";

it("return a 404 if the id is not valid", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await supertest(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({})
    .expect(404);
});
