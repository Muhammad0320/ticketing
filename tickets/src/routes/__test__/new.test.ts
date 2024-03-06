import supertest from "supertest";

import { app } from "../../app";

it("has a route handler of /api/tickets listening for post request", async () => {
  const response = await supertest(app).post(`/api/tickets`).send({});

  expect(response.statusCode).not.toEqual(404);
});

it("can only be accessed when the user is logged in", async () => {
  await supertest(app).post(`/api/tickets`).send({}).expect(401);
});

it("returns status other than 401 if user is authenicated", async () => {
  const response = await supertest(app).post(`/api/tickets`).send({});

  expect(response.status).not.toEqual(401);
});

it("return as error if invalid title is provided", async () => {});

it("return as error if invalid price is provided", async () => {});

it("creates a tickets with valid inputs", async () => {});
