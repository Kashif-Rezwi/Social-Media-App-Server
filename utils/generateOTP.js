function generateOTP() {
  // Generate a random number between 1000 and 9999
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp.toString();
}

module.exports = { generateOTP };
