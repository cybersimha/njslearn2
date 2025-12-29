const pool = require('./db');

async function createUser(username, passwordHash, role) {
  const query = `
    INSERT INTO users (username, password_hash, role)
    VALUES (?, ?, ?)
  `;

  const [result] = await pool.execute(query, [
    username,
    passwordHash,
    role
  ]);

  return { id: result.insertId };
}

async function getAllSupportReps() {
  const query = `
    SELECT id, username
    FROM users
    WHERE role = 'SUPPORT_REP'
    ORDER BY username
  `;

  const [rows] = await pool.execute(query);
  return rows;
}

module.exports = {
  createUser,
  getAllSupportReps
};
