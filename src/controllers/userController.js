const UserRepository = require("../repositories/UserRepository");
const { generateTokens } = require("../utils/jwt");

exports.register = async (req, res) => {
  console.log("enregistrement du user");
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
  const { name, password } = req.body;
  const user = await UserRepository.findByName(name);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  console.log("dsfsdfsdfsdfs");
  const tokens = generateTokens(user);
  res.json({
    id: user.id,
    name: user.name,
    ...tokens,
  });
};

exports.updateUser = async (req, res) => {
  const success = await UserRepository.update(req.params.id, req.body);
  success
    ? res.json({ success: true })
    : res.status(404).json({ error: "User not found" });
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

exports.users = async (req, res) => {};

exports.getAllUsers = async (req, res) => {
  console.log("ssdfsdfsdfsdfs");
  const users = await UserRepository.getAll();
  console.log(users);
  res.status(200).json(users);
};

exports.deleteUser = async (req, res) => {
  const deleted = await UserRepository.delete(req.params.id);
  deleted
    ? res.status(204).end()
    : res.status(404).json({ error: "Users not found" });
};
