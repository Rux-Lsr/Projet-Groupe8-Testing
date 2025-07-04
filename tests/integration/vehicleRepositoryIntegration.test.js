import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import VehicleRepository from "../../src/repositories/VehicleRepository";
const pool = require("../../src/config/db");

describe("VehicleRepository (integration)", () => {
    beforeEach(async () => {
      //Effacer la base de donnees et amorcer les données initiales
      await pool.query("DELETE FROM vehicles");
      await pool.query(
        "INSERT INTO vehicles (registrationNumber, make, model, year, rentalPrice) VALUES ?",
        [
          [
            ["ABC123", "Toyota", "Corolla", 2020, 45.0],
            ["XYZ789", "Honda", "Civic", 2019, 50.0],
          ],
        ]
      );
    });
  
    afterEach(async () => {
      
      // suppression apres le test
      await pool.query("DELETE FROM vehicles");
    });
  
    it("devrait créer un nouveau véhicule dans la base de données", async () => {
      const vehicleData = {
        registrationNumber: "NEW999",
        make: "Ford",
        model: "Focus",
        year: 2021,
        rentalPrice: 40.0,
      };
      const vehicle = await VehicleRepository.create(vehicleData);
      expect(vehicle).toBeDefined();
      expect(vehicle.registrationNumber).toBe("NEW999");
  
      const [rows] = await pool.query(
        "SELECT * FROM vehicles WHERE registrationNumber = ?",
        ["NEW999"]
      );
      expect(rows).toHaveLength(1);
      expect(rows[0].make).toBe("Ford");
    });
  
    it("devrait trouver un véhicule par ID", async () => {
      const [rows] = await pool.query("SELECT * FROM vehicles WHERE make = ?", [
        "Toyota",
      ]);
      const vehicleId = rows[0].id;
  
      const vehicle = await VehicleRepository.findById(vehicleId);
      expect(vehicle).toBeDefined();
      expect(vehicle.make).toBe("Toyota");
    });
  
    it("devrait mettre a jour le prix de location d'un vehicule", async () => {
      const [rows] = await pool.query("SELECT * FROM vehicles WHERE make = ?", [
        "Honda",
      ]);
      const vehicleId = rows[0].id;
  
      const updated = await VehicleRepository.update(vehicleId, {
        rentalPrice: 55.0,
      });
      expect(updated).toBe(true);
  
      const [updatedRows] = await pool.query(
        "SELECT * FROM vehicles WHERE id = ?",
        [vehicleId]
      );
      expect(updatedRows[0].rentalPrice).toBe(55.0);
    });
  
    it("devrait supprimer un vehicule par ID", async () => {
      const [rows] = await pool.query("SELECT * FROM vehicles WHERE make = ?", [
        "Toyota",
      ]);
      const vehicleId = rows[0].id;
  
      const deleted = await VehicleRepository.delete(vehicleId);
      expect(deleted).toBe(true);
  
      const [deletedRows] = await pool.query(
        "SELECT * FROM vehicles WHERE id = ?",
        [vehicleId]
      );
      expect(deletedRows).toHaveLength(0);
    });
  
    it("devrait renvoyer tous les vehicules de la base de donnees", async () => {
      const vehicles = await VehicleRepository.getAll();
      expect(vehicles).toHaveLength(2);
      expect(vehicles[0].make).toBe("Toyota");
      expect(vehicles[1].make).toBe("Honda");
    });
  
    it("doit restituer les véhicules avec un prix de location <= prix max", async () => {
      const maxPrice = 46;
      const vehicles = await VehicleRepository.searchByPrice(maxPrice);
      expect(vehicles).toHaveLength(1);
      expect(vehicles[0].make).toBe("Toyota");
    });
  });