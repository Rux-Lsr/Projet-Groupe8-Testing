-- Table des véhicules
CREATE TABLE IF NOT EXISTS vehicles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  registration_number VARCHAR(20) UNIQUE NOT NULL,
  make VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  year INT NOT NULL,
  rental_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, -- Non haché pour le TP
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Données de base
INSERT INTO vehicles (registration_number, make, model, year, rental_price) VALUES
('ABC123', 'Toyota', 'Camry', 2022, 45.50),
('XYZ789', 'Honda', 'Civic', 2023, 50.00);

INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@propelize.com', 'admin123', 'admin'),
('John Doe', 'john@propelize.com', 'user123', 'user');
