const generateConfirmationCode = () => {
  //6 digit confirmation code
  const code = Math.floor(100000 + Math.random() * 900000);
  return code.toString();
};

module.exports = { generateConfirmationCode };
