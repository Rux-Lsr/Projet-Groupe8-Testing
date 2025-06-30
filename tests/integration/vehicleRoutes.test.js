import express from "express";
import request from "supertest";
import vehicleRouter from "../../src/routes/vehicleRoutes";
import { beforeAll, afterAll, beforeEach, describe, it, expect } from "vitest";
import { seedVehicles, clearDatabase } from "../test-utils";

let app;

beforeAll(() => {
  app = express();
  app.use(express.json());
  app.use("/vehicles", vehicleRouter);
});

beforeEach(async () => {
  await clearDatabase();
  await seedVehicles();
});

afterAll(async () => {
  await clearDatabase();
});

describe("Vehicle routes (integration)", () => {
  it("GET /vehicles retourne tous les véhicules", async () => {
    const res = await request(app).get("/vehicles");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("POST /vehicles crée un véhicule", async () => {
    const res = await request(app).post("/vehicles").send({
      registrationNumber: "NEW123",
      make: "Peugeot",
      model: "208",
      year: 2024,
      rentalPrice: 60,
    });
    expect(res.status).toBe(201);
    expect(res.body.make).toBe("Peugeot");
  });

  it("GET /vehicles/:id retourne un véhicule", async () => {
    const res = await request(app).get("/vehicles/1");
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it("PUT /vehicles/:id modifie un véhicule", async () => {
    const res = await request(app).put("/vehicles/1").send({ make: "Renault" });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("DELETE /vehicles/:id supprime un véhicule", async () => {
    const res = await request(app).delete("/vehicles/1");
    expect(res.status).toBe(204);
  });

  it("GET /vehicles/search/:registrationNumber recherche par immatriculation", async () => {
    const res = await request(app).get("/vehicles/search/ABC123");
    expect(res.status).toBe(200);
    expect(res.body.registrationNumber).toBe("ABC123");
  });

  it("GET /vehicles/price/:maxPrice recherche par prix", async () => {
    const res = await request(app).get("/vehicles/price/50");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(parseInt(res.body[0].rentalPrice)).toBeLessThanOrEqual(50);
  });
});
