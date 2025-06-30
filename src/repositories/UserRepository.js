const pool = require("../config/db");
const User = require("../entities/user");

class UserRepository {
  static async create({ name, email, password }) {
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password] // Password stocké en clair
    );
    return new User({ id: result.insertId, name, email, password });
  }

  static async findByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0] ? new User(rows[0]) : null;
  }

  static async update(id, userData) {
    const [result] = await pool.query("UPDATE users SET ? WHERE id = ?", [
      userData,
      id,
    ]);
    return result.affectedRows > 0;
  }
}

module.exports = UserRepository;
