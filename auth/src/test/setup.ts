import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

beforeAll(async () => {
  const mongo = await MongoMemoryServer.create();

  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});
