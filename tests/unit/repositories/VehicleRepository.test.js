import { describe, it, expect } from "vitest";
import VehicleRepository from "../../../src/repositories/VehicleRepository";
import { beforeEach, afterEach } from "vitest";

import { seedVehicles, clearDatabase } from "../../test-utils";

describe("VehicleRepository", () => {
  beforeEach(async () => {
    await clearDatabase();
    await seedVehicles();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  describe("getAll()", () => {
    it("should return all vehicles", async () => {
      // Act
      const vehicles = await VehicleRepository.getAll();

      // Assert
      expect(vehicles).toHaveLength(2);
      expect(vehicles[0].make).toBe("Toyota");
    });
  });

  describe("findByRegistration()", () => {
    it("should find vehicle by registration number", async () => {
      // Arrange
      const regNumber = "ABC123";

      // Act
      const vehicle = await VehicleRepository.findByRegistration(regNumber);

      // Assert
      expect(vehicle).toBeDefined();
      expect(vehicle.registrationNumber).toBe(regNumber);
    });
  });

  describe("update()", () => {
    it("should update vehicle price", async () => {
      // Arrange
      const vehicleId = 1;
      const newPrice = 55.0;

      // Act
      const updated = await VehicleRepository.update(vehicleId, {
        rentalPrice: newPrice,
      });
      const vehicle = await VehicleRepository.findById(vehicleId);

      // Assert
      expect(updated).toBe(true);
      expect(Number(vehicle.rentalPrice)).toBe(newPrice);
    });
  });

  describe("create()", () => {
    it("should create a new vehicle", async () => {
      // Arrange
      const vehicleData = {
        registrationNumber: "NEW999",
        make: "Ford",
        model: "Focus",
        year: 2021,
        rentalPrice: 40.0,
      };

      // Act
      const vehicle = await VehicleRepository.create(vehicleData);
      const found = await VehicleRepository.findByRegistration("NEW999");

      // Assert
      expect(vehicle).toBeDefined();
      expect(found).toBeDefined();
      expect(found.make).toBe("Ford");
    });
  });

  describe("delete()", () => {
    it("should delete a vehicle by id", async () => {
      // Arrange
      const vehicleId = 1;

      // Act
      const deleted = await VehicleRepository.delete(vehicleId);
      const vehicle = await VehicleRepository.findById(vehicleId);

      // Assert
      expect(deleted).toBe(true);
      expect(vehicle).toBeNull();
    });
  });

  describe("searchByPrice()", () => {
    it("should return vehicles with rentalPrice <= maxPrice", async () => {
      // Arrange
      const maxPrice = 46;

      // Act
      const vehicles = await VehicleRepository.searchByPrice(maxPrice);

      // Assert
      expect(Array.isArray(vehicles)).toBe(true);
      expect(vehicles.length).toBe(1);
      expect(vehicles[0].make).toBe("Toyota");
    });
  });
});
