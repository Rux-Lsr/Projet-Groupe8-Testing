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
  it("POST /users/register enregistre un utilisateur (sans email ni role)", async () => {
    const res = await request(app).post("/users/register").send({
      name: "Test",
      password: "1234",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Test");
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
  });

  it("POST /users/login connecte un utilisateur (par nom)", async () => {
    const res = await request(app)
      .post("/users/login")
      .send({ name: "Admin", password: "admin123" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
  });

  it("PUT /users/:id modifie un utilisateur", async () => {
    const res = await request(app).put("/users/1").send({ name: "Updated" });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("DELETE /users/:id Supprime un utilisateur", async () => {
    const res = await request(app).delete("/users/1");
    expect(res.status).toBe(204);
  });

  it("GET /users recuperer tous les utilisateurs", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
