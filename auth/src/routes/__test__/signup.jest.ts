import supertest from "supertest";
import { app } from "../../app";

it("returns a 201 successful signup", async () => {
  return supertest(app)
    .post("/api/users/signup")
    .send({ email: "hello@test.com", password: "passwords" })
    .expect(201);
});

it("returns 400 on invalid email", async () => {
  return supertest(app)
    .post("api/users/v1")
    .send({ email: "shitititititit", password: "passwords" })
    .expect(400);
});
