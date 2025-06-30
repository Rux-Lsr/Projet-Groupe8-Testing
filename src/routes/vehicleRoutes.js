const express = require("express");
const vehicleRouter = express.Router();
const vehicleController = require("../controllers/vehicleController");

vehicleRouter.post("/", vehicleController.createVehicle);
vehicleRouter.get("/", vehicleController.getAllVehicles);
vehicleRouter.get("/:id", vehicleController.getVehicle);
vehicleRouter.put("/:id", vehicleController.updateVehicle);
vehicleRouter.delete("/:id", vehicleController.deleteVehicle);
vehicleRouter.get(
  "/search/:registrationNumber",
  vehicleController.searchByRegistration
);
vehicleRouter.get("/price/:maxPrice", vehicleController.searchByPrice);

module.exports = vehicleRouter;
