const express = require("express");
const YAML = require("yamljs");
const cors = require("cors");
const vehicleRoutes = require("./routes/vehicleRoutes");
const UserRouter = require("./routes/userRoute");
const swaggerUi = require("swagger-ui-express");
//const swaggerSpec = require("./config/swagger");
const swaggerDocument = YAML.load("./src/config/openapi.yaml");
const app = express();
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/users", UserRouter);

// Middleware d'erreur
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
module.exports = app;
