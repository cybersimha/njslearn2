const pool = require('./db');

// Insert or update OTP for a phone number
async function upsertOtp(phone, otp) {
  const query = `
    INSERT INTO customer_otp (phone, otp, verified)
    VALUES (?, ?, false)
    ON DUPLICATE KEY UPDATE
      otp = VALUES(otp),
      verified = false,
      created_at = CURRENT_TIMESTAMP
  `;

  await pool.execute(query, [phone, otp]);
}

// Verify OTP
async function verifyOtp(phone, otp) {
  const query = `
    SELECT phone
    FROM customer_otp
    WHERE phone = ? AND otp = ?
  `;

  const [rows] = await pool.execute(query, [phone, otp]);
  return rows.length > 0;
}

// Mark phone as verified
async function markVerified(phone) {
  const query = `
    UPDATE customer_otp
    SET verified = true
    WHERE phone = ?
  `;

  await pool.execute(query, [phone]);
}

// Check if phone is verified
async function isVerified(phone) {
  const query = `
    SELECT verified
    FROM customer_otp
    WHERE phone = ?
  `;

  const [rows] = await pool.execute(query, [phone]);
  return rows[0]?.verified === 1;
}

module.exports = {
  upsertOtp,
  verifyOtp,
  markVerified,
  isVerified
};
