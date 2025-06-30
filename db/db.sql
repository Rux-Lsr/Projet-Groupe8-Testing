-- Table des véhicules
CREATE TABLE IF NOT EXISTS vehicles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  registrationNumber VARCHAR(20) UNIQUE NOT NULL,
  make VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  year INT NOT NULL,
  rentalPrice DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Table des utilisateurs (modèle simplifié)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL, -- Non haché pour le TP
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Données de base
INSERT INTO vehicles (registrationNumber, make, model, year, rentalPrice) VALUES
('ABC123', 'Toyota', 'Camry', 2022, 45.50),
('XYZ789', 'Honda', 'Civic', 2023, 50.00);


INSERT INTO users (name, password) VALUES
('Admin', 'admin123'),
('John Doe', 'user123');