import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns 404 if ticket is not found", async () => {
    //for generating random mongose id
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app).get(`/api/tickets/${id}`).send({});

  expect(response.status).toEqual(404);
});


it("returns the ticket if it is found", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).toEqual(404);
});
