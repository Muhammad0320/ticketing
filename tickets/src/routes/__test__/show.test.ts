import supertest from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("return 404 if no ticket with such id", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await supertest(app).get(`/api/tickets/${id}`).send({}).expect(404);
});

it("returns 200 if there is a ticket with such id", async () => {
  const title = "New Ticket";
  const price = 999;

  const response = await supertest(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);

  const ticketResponse = await supertest(app)
    .get(`/api/tickets/${response.body.id}`)
    .send({})
    .expect(200);

  expect(ticketResponse[0].title).toEqual(title);
  expect(ticketResponse[0].price).toEqual(price);
});
