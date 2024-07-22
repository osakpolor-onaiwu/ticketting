import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "osas@gmail.com",
      password: "password",
    })
    .expect(201);
});

it("returns a 400 with invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "osas",
      password: "1234",
    })
    .expect(400);
});

it("returns a 400 with missing email and password", async () => {
  await request(app).post("/api/users/signup").send({}).expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "osas@gmail.com",
    })
    .expect(400);
});

it("disallow duplicate email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "osaK@gmail.com",
      password: "1234",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "osaK@gmail.com",
      password: "1234",
    })
    .expect(400);
});

it("sets cookie after succesful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "osaK@gmail.com",
      password: "1234",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
