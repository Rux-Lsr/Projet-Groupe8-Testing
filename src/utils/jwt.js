const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, name: user.name },
    JWT_SECRET,
    { expiresIn: "15m" } // Token court terme
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    JWT_SECRET,
    { expiresIn: "7d" } // Token long terme
  );

  return { accessToken, refreshToken };
};

exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
