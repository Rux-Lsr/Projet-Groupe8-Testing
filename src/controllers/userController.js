const UserRepository = require("../repositories/UserRepository");
const { generateTokens } = require("../utils/jwt");
const jwt = require("jsonwebtoken"); // Ajout de l'import manquant

exports.register = async (req, res) => {
  try {
    const user = await UserRepository.create(req.body);
    const tokens = generateTokens(user);
    res.status(201).json({
      id: user.id,
      name: user.name,
      ...tokens,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await UserRepository.findByName(name);

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const tokens = generateTokens(user);
    res.json({
      id: user.id,
      name: user.name,
      ...tokens,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const success = await UserRepository.update(req.params.id, req.body);
    success
      ? res.json({ success: true })
      : res.status(404).json({ error: "User not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      error: "Refresh token required",
    });
  }

  try {
    // Vérification avec le même secret
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    // Génération du nouveau accessToken
    const newAccessToken = jwt.sign(
      { id: decoded.id }, // Même payload que le token original
      process.env.JWT_SECRET,
      { expiresIn: "15m" } // Durée courte
    );

    res.json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Invalid refresh token",
      details: error.message,
    });
  }
};

    // Logique de suppression selon votre base de données
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedUser = await UserRepository.delete(id);
    
    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: error.message });
  }
};