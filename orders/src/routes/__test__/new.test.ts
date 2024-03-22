import mongoose from "mongoose";
import supertest from "supertest";
import { app } from "../../app";

it("returns an error if ticket does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId();

  await supertest(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId })
    .expect(404);
});

it("returns an error if the ticket is alrealy reserved", async () => {});

it("reserves a ticket", async () => {});
