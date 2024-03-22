import supertest from "supertest";
import { Ticket } from "../../model/tickets";
import { app } from "../../app";

it("returns an error if a user tries to get anpther user's order", async () => {
  const ticket = await supertest(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ price: 40, title: "shit shit " })
    .expect(201);

  const order = await supertest(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticket: ticket.body.id })
    .expect(201);

  await supertest(app)
    .get(`/api/orders/${order.body.id}`)
    .set("Cookie", global.signin())
    .send({})
    .expect(401);
});

it("shows an order from the current user orders", async () => {});
