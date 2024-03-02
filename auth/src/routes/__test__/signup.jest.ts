import supertest from "supertest";
import { app } from "../../app";

it("returns a 201 successful signup", async () => {
  return supertest(app)
    .post("/api/users/signup")
    .send({ email: "hello@test.com", password: "passwords" })
    .expect(201);
});
