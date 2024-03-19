import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
}

jest.mock("../natsWrapper.ts");

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "my-super-secure-and-ultra-long-secret-string-for-jwt";

  mongo = await MongoMemoryServer.create();

  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();

  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
});

global.signin = () => {
  // Build a jwt payload

  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // create jwt

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build session obj to json

  const session = { jwt: token };

  const sessionString = JSON.stringify(session);
  // Take JSON and encode it as base64

  const cookie = Buffer.from(sessionString).toString("base64");

  // return a string thats the cookie with the encoded data

  return [`session=${cookie}`];
};
