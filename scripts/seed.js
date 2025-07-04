// scripts/seed.js
require('dotenv').config(); // charge les variables .env en premier

const mysql = require('mysql2/promise');

// Création du pool de connexions avec les variables d'environnement
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function seed() {
  try {
    // Nettoyage
    await pool.query("SET FOREIGN_KEY_CHECKS = 0;");
    await pool.query("TRUNCATE TABLE vehicles;");
    await pool.query("TRUNCATE TABLE users;");
    await pool.query("SET FOREIGN_KEY_CHECKS = 1;");

    // Seed users
    await pool.query(`
      INSERT INTO users (name, password) VALUES
      ('Admin', 'admin123'),
      ('User', 'user123')
    `);

    // Seed vehicles
    await pool.query(`
      INSERT INTO vehicles (registrationNumber, make, model, year, rentalPrice) VALUES
      ('ABC123', 'Toyota', 'Camry', 2022, 45.50),
      ('XYZ789', 'Honda', 'Civic', 2023, 50.00)
    `);

    console.log("Seed terminé avec succès !");
    process.exit(0);
  } catch (err) {
    console.error("Erreur lors du seed :", err);
    process.exit(1);
  }
}

seed();
