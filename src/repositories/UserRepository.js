const pool = require("../config/db");
const User = require("../entities/user");

class UserRepository {
  static async create({ name, password }) {
    const [result] = await pool.query(
      "INSERT INTO users (name, password) VALUES (?, ?)",
      [name, password]
    );
    return new User({ id: result.insertId, name, password });
  }

  static async findByName(name) {
    const [rows] = await pool.query("SELECT * FROM users WHERE name = ?", [
      name,
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
