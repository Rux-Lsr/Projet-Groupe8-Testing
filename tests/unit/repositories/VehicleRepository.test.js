import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import VehicleRepository from "../../../src/repositories/VehicleRepository";
import {
  mockVehicles,
  seedVehicles,
  clearDatabase,
} from "../../mock-datas-utils";

describe("VehicleRepository (mocked)", () => {
  beforeEach(async () => {
    await clearDatabase();
    await seedVehicles();

    vi.spyOn(VehicleRepository, "getAll").mockImplementation(async () => {
      return mockVehicles;
    });

    vi.spyOn(VehicleRepository, "findByRegistration").mockImplementation(
      async (registrationNumber) => {
        return (
          mockVehicles.find(
            (v) => v.registrationNumber === registrationNumber
          ) || null
        );
      }
    );

    vi.spyOn(VehicleRepository, "findById").mockImplementation(async (id) => {
      return mockVehicles.find((v) => v.id === id) || null;
    });

    vi.spyOn(VehicleRepository, "create").mockImplementation(
      async (vehicleData) => {
        const id = mockVehicles.length + 1;
        const vehicle = { id, ...vehicleData };
        mockVehicles.push(vehicle);
        return vehicle;
      }
    );

    vi.spyOn(VehicleRepository, "update").mockImplementation(
      async (id, vehicleData) => {
        const vehicle = mockVehicles.find((v) => v.id === id);
        if (!vehicle) return false;
        Object.assign(vehicle, vehicleData);
        return true;
      }
    );

    vi.spyOn(VehicleRepository, "delete").mockImplementation(async (id) => {
      const index = mockVehicles.findIndex((v) => v.id === id);
      if (index === -1) return false;
      mockVehicles.splice(index, 1);
      return true;
    });

    vi.spyOn(VehicleRepository, "searchByPrice").mockImplementation(
      async (maxPrice) => {
        return mockVehicles.filter((v) => v.rentalPrice <= maxPrice);
      }
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return all vehicles", async () => {
    const vehicles = await VehicleRepository.getAll();
    expect(vehicles).toHaveLength(2);
    expect(vehicles[0].make).toBe("Toyota");
  });

  it("should find vehicle by registration number", async () => {
    const regNumber = "ABC123";
    const vehicle = await VehicleRepository.findByRegistration(regNumber);
    expect(vehicle).toBeDefined();
    expect(vehicle.registrationNumber).toBe(regNumber);
  });

  it("should create a new vehicle", async () => {
    const vehicleData = {
      registrationNumber: "NEW999",
      make: "Ford",
      model: "Focus",
      year: 2021,
      rentalPrice: 40.0,
    };
    const vehicle = await VehicleRepository.create(vehicleData);
    expect(vehicle).toBeDefined();
    expect(vehicle.make).toBe("Ford");
  });

  it("should update vehicle price", async () => {
    const vehicleId = 1;
    const newPrice = 55.0;
    const updated = await VehicleRepository.update(vehicleId, {
      rentalPrice: newPrice,
    });
    expect(updated).toBe(true);
    const vehicle = await VehicleRepository.findById(vehicleId);
    expect(vehicle.rentalPrice).toBe(newPrice);
  });

  it("should delete a vehicle by id", async () => {
    const vehicleId = 1;
    const deleted = await VehicleRepository.delete(vehicleId);
    expect(deleted).toBe(true);
    const vehicle = await VehicleRepository.findById(vehicleId);
    expect(vehicle).toBeNull();
  });

  it("should return vehicles with rentalPrice <= maxPrice", async () => {
    const maxPrice = 46;
    const vehicles = await VehicleRepository.searchByPrice(maxPrice);
    expect(Array.isArray(vehicles)).toBe(true);
    expect(vehicles.length).toBe(1);
    expect(vehicles[0].make).toBe("Toyota");
  });
});
