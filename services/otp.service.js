const otpRepository = require('../data/otp.repository');

const MOCK_OTP = '123456';

// Request OTP (mock implementation)
async function requestOtp(phone) {
  // In future:
  // 1. generate random OTP
  // 2. send via SMS gateway
  // 3. store hashed OTP

  await otpRepository.upsertOtp(phone, MOCK_OTP);

  return {
    message: 'OTP sent successfully'
  };
}

// Verify OTP
async function verifyOtp(phone, otp) {
  const isValid = await otpRepository.verifyOtp(phone, otp);

  if (!isValid) {
    return { verified: false };
  }

  await otpRepository.markVerified(phone);

  return { verified: true };
}

// Check verification status
async function isPhoneVerified(phone) {
  return await otpRepository.isVerified(phone);
}

module.exports = {
  requestOtp,
  verifyOtp,
  isPhoneVerified
};
