import supertest from "supertest";

import { app } from "../../app";
import { Ticket } from "../../../model/tickets";
import { natsWrapper } from "../../../natsWrapper";

it("has a route handler of /api/tickets listening for post request", async () => {
  const response = await supertest(app).post(`/api/tickets`).send({});

  expect(response.statusCode).not.toEqual(404);
});

it("can only be accessed when the user is logged in", async () => {
  await supertest(app).post(`/api/tickets`).send({}).expect(401);
});

it("returns status other than 401 if user is authenicated", async () => {
  const response = await supertest(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("return as error if invalid title is provided", async () => {
  await supertest(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "", price: 94 })
    .expect(400);

  await supertest(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ price: 94 })
    .expect(400);
});

it("return as error if invalid price is provided", async () => {
  await supertest(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "iheifheifhei", price: -94 })
    .expect(400);

  await supertest(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "nfeineifeif" })
    .expect(400);
});

it("creates a tickets with valid inputs", async () => {
  // check if a new record is added to the db

  let tickets = await Ticket.find({});

  expect(tickets.length).toEqual(0);

  const title = "New tickets";

  await supertest(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price: 99 })
    .expect(201);

  tickets = await Ticket.find({});

  expect(tickets.length).toEqual(1);

  expect(tickets[0].title).toEqual(title);
  expect(tickets[0].price).toEqual(99);
});

it("publishes a ticket:created event", async () => {
  const title = "New tickets";

  await supertest(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price: 99 })
    .expect(201);

  expect(natsWrapper.connect).toHaveBeenCalled();
});
