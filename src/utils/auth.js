const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

exports.comparePasswords = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
