const express = require("express");
const vehicleRoutes = require("./routes/vehicleRoutes");
const UserRouter = require("./routes/userRoute");

const app = express();

app.use(express.json());
app.use("/vehicles", vehicleRoutes);
app.use("/users", UserRouter);

// Middleware d'erreur
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
module.exports = app;
