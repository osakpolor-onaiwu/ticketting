import request from "supertest";
import { app } from "../../app";

it("", async () => {
    const response = await request(app)
    .post('/api/tickets')
    .send({})

    expect(response.status).not.toEqual(404);
});

it("", async () => {});

it("", async () => {});

it("", async () => {});
