const usersService = require('../services/users.service');

// POST /users/support-rep
async function createSupportRep(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'username and password required' });
  }

  const result = await usersService.createSupportRep(
    username,
    password
  );

  return res.status(201).json(result);
}

// GET /users/support-reps
async function getSupportReps(req, res) {
  const reps = await usersService.getSupportReps();
  return res.status(200).json(reps);
}

module.exports = {
  createSupportRep,
  getSupportReps
};
