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

it("returns a 401, if user does not own the ticket", async () => {
  const response = await supertest(app)
    .post("/api/ticket")
    .set("Cookie", global.signin())
    .send({ title: "nrjvnrjvbr", price: 40 })
    .expect(201);

  const updateResponse = await supertest(app)
    .put(`/api/ticket${response.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "nrnri", price: 20 })
    .expect(401);

  expect(updateResponse.body.title).toEqual("nrjvnrjvbr");
});

it("returns a 400 if the input are invalid", async () => {
  const response = await supertest(app)
    .post("/api/ticket")
    .set("Cookie", global.signin())
    .send({ title: "nrjvnrjvbr", price: 40 })
    .expect(201);

  await supertest(app)
    .put(`/api/ticket${response.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "", price: 20 })
    .expect(400);

  await supertest(app)
    .put(`/api/ticket${response.body.id}`)
    .set("Cookie", global.signin())
    .send({ price: 20 })
    .expect(400);

  await supertest(app)
    .put(`/api/ticket${response.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "nnvdj", price: -20 })
    .expect(400);

  await supertest(app)
    .put(`/api/ticket${response.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "vjnjv" })
    .expect(400);
});
