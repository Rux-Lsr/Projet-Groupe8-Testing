const express = require("express");
const UserRouter = express.Router();
const { validate } = require("../middlewares/auth");
const userController = require("../controllers/userController");

UserRouter.post("/register", userController.register);
UserRouter.post("/login", userController.login);
UserRouter.post("/refresh-token", userController.refreshToken);
UserRouter.put("/:id", userController.updateUser);

// Route protégée exemple
UserRouter.get("/profile", validate, (req, res) => {
  res.json({ user: req.user });
});

module.exports = UserRouter;
