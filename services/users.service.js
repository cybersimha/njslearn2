const bcrypt = require('bcrypt');
const usersRepository = require('../data/users.repository');

async function createSupportRep(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  return await usersRepository.createUser(
    username,
    passwordHash,
    'SUPPORT_REP'
  );
}

async function getSupportReps() {
  return await usersRepository.getAllSupportReps();
}

module.exports = {
  createSupportRep,
  getSupportReps
};
