import supertest from "supertest";
import { app } from "../../app";

it("returns 400 on invalid email", async () => {
  return supertest(app)
    .post("api/users/signin")
    .send({ email: "test@example.com", password: "password" })
    .expect(400);
});
