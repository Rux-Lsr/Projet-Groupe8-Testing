const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");

router.post("/", vehicleController.createVehicle);
router.get("/", vehicleController.getAllVehicles);
router.get("/:id", vehicleController.getVehicle);
router.put("/:id", vehicleController.updateVehicle);
router.delete("/:id", vehicleController.deleteVehicle);
router.get(
  "/search/:registrationNumber",
  vehicleController.searchByRegistration
);
router.get("/price/:maxPrice", vehicleController.searchByPrice);

module.exports = router;
