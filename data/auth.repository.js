const pool = require('./db');

async function getUserByUsername(username) {
  const query = `
    SELECT id, username, password_hash, role
    FROM users
    WHERE username = ?
  `;

  const [rows] = await pool.execute(query, [username]);
  return rows[0] || null;
}

module.exports = {
  getUserByUsername
};
