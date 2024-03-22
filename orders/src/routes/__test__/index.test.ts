import supertest from "supertest";
import { Ticket } from "../../model/tickets";
import { app } from "../../app";

const ticketBuilder = async () => {
  return await Ticket.create({ price: 20, title: "Football game" });
};

it("fetches order for a particular user", async () => {
  const ticketOne = await ticketBuilder();
  const ticketTwo = await ticketBuilder();
  const ticketThree = await ticketBuilder();

  const cookieOne = global.signin();

  const cookieTwo = global.signin();

  await supertest(app)
    .post("/api/orders")
    .set("Cookie", cookieOne)
    .send({ ticket: ticketOne })
    .expect(201);

  const { body: orderOne } = await supertest(app)
    .post("/api/orders")
    .set("Cookie", cookieTwo)
    .send({ ticket: ticketTwo })
    .expect(201);

  const { body: orderTwo } = await supertest(app)
    .post("/api/orders")
    .set("Cookie", cookieTwo)
    .send({ ticket: ticketThree })
    .expect(201);

  const response = await supertest(app)
    .get("/api/orders")
    .set("Cookie", cookieTwo)
    .send({});

  expect(response.body.length).toEqual(2);

  expect(response.body[0].id).toEqual(orderOne.id);

  expect(response.body[1].id).toEqual(orderTwo.id);

  expect(response.body[0].ticket.id).toEqual(ticketTwo.id);

  expect(response.body[1].ticket.id).toEqual(ticketThree.id);
});
