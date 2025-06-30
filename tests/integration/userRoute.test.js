import express from "express";
import request from "supertest";
import UserRouter from "../../src/routes/userRoute";
import { beforeAll, afterAll, beforeEach, describe, it, expect } from "vitest";
import { seedUsers, clearDatabase } from "../test-utils";

let app;

beforeAll(() => {
  app = express();
  app.use(express.json());
  app.use("/users", UserRouter);
});

beforeEach(async () => {
  await clearDatabase();
  await seedUsers();
});

afterAll(async () => {
  await clearDatabase();
});

describe("User routes (integration)", () => {
  it("POST /users/register enregistre un utilisateur", async () => {
    const res = await request(app).post("/users/register").send({
      name: "Test",
      email: "test@test.com",
      password: "1234",
      role: "user",
    });
    expect(res.status).toBe(201);
    expect(res.body.email).toBe("test@test.com");
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
  });

  it("POST /users/login connecte un utilisateur", async () => {
    const res = await request(app)
      .post("/users/login")
      .send({ email: "admin@propelize.com", password: "admin123" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
  });

  it("PUT /users/:id modifie un utilisateur", async () => {
    const res = await request(app).put("/users/1").send({ name: "Updated" });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // Pour GET /users/profile, il faut gérer l'authentification dans le test
});
