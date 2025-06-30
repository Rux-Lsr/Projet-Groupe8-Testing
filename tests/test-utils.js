import pool from "../src/config/db";
export const seedUsers = async () => {
  await pool.query(`
    INSERT INTO users (name, password)
    VALUES 
      ('Admin', 'admin123'),
      ('User', 'user123')
  `);
};

export const seedVehicles = async () => {
  await pool.query(`
    INSERT INTO vehicles (id, registrationNumber, make, model, year, rentalPrice)
    VALUES 
      (1, 'ABC123', 'Toyota', 'Camry', 2022, 45.50),
      (2, 'XYZ789', 'Honda', 'Civic', 2023, 50.00)
  `);
};

export const clearDatabase = async () => {
  await pool.query("SET FOREIGN_KEY_CHECKS = 0;");
  await pool.query("TRUNCATE TABLE vehicles;");
  await pool.query("TRUNCATE TABLE users;");
  await pool.query("SET FOREIGN_KEY_CHECKS = 1;");
};
