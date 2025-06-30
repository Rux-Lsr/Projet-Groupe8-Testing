const pool = require("../config/db");
const Vehicle = require("../entities/vehicle");

class VehicleRepository {
  static async create(vehicleData) {
    const [result] = await pool.query(
      "INSERT INTO vehicles SET ?",
      vehicleData
    );
    return new Vehicle({ id: result.insertId, ...vehicleData });
  }

  static async findById(id) {
    const [rows] = await pool.query("SELECT * FROM vehicles WHERE id = ?", [
      id,
    ]);
    return rows[0] ? new Vehicle(rows[0]) : null;
  }

  static async findByRegistration(registrationNumber) {
    const [rows] = await pool.query(
      "SELECT * FROM vehicles WHERE registrationNumber = ?",
      [registrationNumber]
    );
    return rows[0] ? new Vehicle(rows[0]) : null;
  }

  static async update(id, vehicleData) {
    const [result] = await pool.query("UPDATE vehicles SET ? WHERE id = ?", [
      vehicleData,
      id,
    ]);
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await pool.query("DELETE FROM vehicles WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  }

  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM vehicles");
    return rows.map((row) => new Vehicle(row));
  }

  static async searchByPrice(maxPrice) {
    const [rows] = await pool.query(
      "SELECT * FROM vehicles WHERE rentalPrice <= ?",
      [maxPrice]
    );
    return rows.map((row) => new Vehicle(row));
  }
}

module.exports = VehicleRepository;
