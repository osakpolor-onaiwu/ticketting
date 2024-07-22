import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

let mongo: any;


beforeAll(async () => {
  process.env.JWT_KEY = "asset";
  mongo = new MongoMemoryServer();
  const uri = await mongo.getUri();
  await mongoose.connect(uri, {});
  app.listen(3000);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) await mongo.stop();
  await mongoose.connection.close();
});


//for declaring a global function
declare global {
  var signin: () => Promise<string[]>;
}
global.signin = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
       .post("/api/users/signup")
       .send({
            email,
            password
        })
       .expect(201);
    
    const cookie = response.get('Set-Cookie');

    return cookie || [''];

}
