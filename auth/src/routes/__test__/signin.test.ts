import request from "supertest";
import { app } from "../../app";

it("fails when email does not exist", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "email2test@gmail.com",
      password: "123",
    })
    .expect(400);
});

it("fails when wrong password is sent", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "email2test@gmail.com",
      password: "passoword",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "email2test@gmail.com",
      password: "123",
    })
    .expect(400);
});


it("should return cookie", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "email2test@gmail.com",
      password: "passoword",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "email2test@gmail.com",
      password: "passoword23",
    })
    .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
});