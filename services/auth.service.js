const bcrypt = require('bcrypt');
const authRepository = require('../data/auth.repository');

async function login(username, password) {
  const user = await authRepository.getUserByUsername(username);

  if (!user) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!passwordMatches) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    role: user.role
  };
}

module.exports = {
  login
};
