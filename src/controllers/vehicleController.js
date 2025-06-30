const VehicleRepository = require("../repositories/VehicleRepository");

exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await VehicleRepository.create(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getVehicle = async (req, res) => {
  const vehicle = await VehicleRepository.findById(req.params.id);
  vehicle
    ? res.json(vehicle)
    : res.status(404).json({ error: "Vehicle not found" });
};

exports.updateVehicle = async (req, res) => {
  const updated = await VehicleRepository.update(req.params.id, req.body);
  updated
    ? res.status(200).json({ success: true })
    : res.status(404).json({ error: "Vehicle not found" });
};

exports.deleteVehicle = async (req, res) => {
  const deleted = await VehicleRepository.delete(req.params.id);
  deleted
    ? res.status(204).end()
    : res.status(404).json({ error: "Vehicle not found" });
};

exports.getAllVehicles = async (req, res) => {
  const vehicles = await VehicleRepository.getAll();
  res.status(200).json(vehicles);
};

exports.searchByRegistration = async (req, res) => {
  const vehicle = await VehicleRepository.findByRegistration(
    req.params.registrationNumber
  );
  vehicle
    ? res.json(vehicle)
    : res.status(404).json({ error: "Vehicle not found" });
};

exports.searchByPrice = async (req, res) => {
  const vehicles = await VehicleRepository.searchByPrice(req.params.maxPrice);
  res.status(200).json(vehicles);
};
