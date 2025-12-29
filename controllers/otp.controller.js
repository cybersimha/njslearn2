const otpService = require('../services/otp.service');

// POST /otp/request
async function requestOtp(req, res) {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: 'phone is required' });
  }

  await otpService.requestOtp(phone);
  return res.status(200).json({ message: 'OTP sent' });
}

// POST /otp/verify
async function verifyOtp(req, res) {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ message: 'phone and otp are required' });
  }

  const result = await otpService.verifyOtp(phone, otp);

  if (!result.verified) {
    return res.status(401).json({ message: 'Invalid OTP' });
  }

  return res.status(200).json({ verified: true });
}

module.exports = {
  requestOtp,
  verifyOtp
};
