// Données mockées en mémoire
export let mockUsers = [];
export let mockVehicles = [];

// Fonctions de seed
export const seedUsers = async () => {
  mockUsers = [
    {
      id: 1,
      name: "Admin",
      password: "admin123",
    },
    {
      id: 2,
      name: "User",
      password: "user123",
    },
  ];
};

export const seedVehicles = async () => {
  mockVehicles = [
    {
      id: 1,
      registrationNumber: "ABC123",
      make: "Toyota",
      model: "Camry",
      year: 2022,
      rentalPrice: 45.5,
    },
    {
      id: 2,
      registrationNumber: "XYZ789",
      make: "Honda",
      model: "Civic",
      year: 2023,
      rentalPrice: 50.0,
    },
  ];
};

export const clearDatabase = async () => {
  mockUsers = [];
  mockVehicles = [];
};
