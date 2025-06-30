const express = require("express");
const vehicleRoutes = require("./routes/vehicleRoutes");

const app = express();

app.use(express.json());
app.use("/vehicles", vehicleRoutes);

module.exports = app;
