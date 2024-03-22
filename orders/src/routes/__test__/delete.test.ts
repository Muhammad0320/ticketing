import supertest from "supertest";
import { Ticket } from "../../model/tickets";
import { app } from "../../app";

it("cancells an order", async () => {
  const ticket = await Ticket.build({ price: 99, title: "Hajj" });

  const user = global.signin();

  const { body: order } = await supertest(app)
    .post("/api/order")
    .set("Cookie", user)
    .send({ ticket: ticket.id })
    .expect(201);

  await supertest(app)
    .delete(`/api/order${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);
});
