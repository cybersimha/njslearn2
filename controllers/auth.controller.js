const authService = require('../services/auth.service');

// POST /auth/login
async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'username and password required' });
  }

  const user = await authService.login(username, password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.status(200).json(user);
}

module.exports = {
  login
};
