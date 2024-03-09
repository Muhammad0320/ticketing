import supertest from "supertest";
import { app } from "../../app";

const createTicket = () =>
  supertest(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signin())
    .send({ title: "titlenjfn", price: 200 })
    .expect(201);

it("can return a list of tickets ", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = supertest(app).get("/api/tickets").send({}).expect(200);

  expect(response.body.length).toEqual(3);
});
