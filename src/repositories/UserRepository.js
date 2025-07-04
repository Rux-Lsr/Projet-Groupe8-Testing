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



// Section de suppression d'utilisateur
  static async delete(id) {
    try {
      const [userExists] = await pool.query(
        "SELECT id, name FROM users WHERE id = ?", 
        [id]
      );
      
      if (userExists.length === 0) {
        return { success: false, message: "Utilisateur non trouvé" };
      }
      if (userExists[0].name === 'Admin') {
        return { success: false, message: "Impossible de supprimer l'administrateur" };
      }

      const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
      
      if (result.affectedRows > 0) {
        return { 
          success: true, 
          message: "Utilisateur supprimé avec succès",
          deletedUser: userExists[0]
        };
      } else {
        return { success: false, message: "Erreur lors de la suppression" };
      }
      
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      return { success: false, message: "Erreur de base de données" };
    }
  }

}


module.exports = UserRepository;
