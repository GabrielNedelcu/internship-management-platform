const bcrypt = require("bcrypt");
const passGenerator = require("generate-password");

/**
 * Hash a password using the bcrypt module
 *
 * @param {String}  password - The password in plain text
 *
 * @return {String}          - The hashed password
 */
async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

/**
 * Generate a password of 10 characters using the generate-password module
 *
 * @return {String}          - The hash of the generated password
 */
function generatePassword() {
  const password = passGenerator.generate({
    length: 10,
    numbers: true,
    strict: true,
  });

  return password;
}

/**
 * Compares a plain text password and a hashed password
 *
 * @param {String}  password        - The password in plain text
 * @param {String}  hashedPassword  - The hashed password
 *
 * @return {Boolean}          - true if the passwords match, false otherwise
 */
async function comparePasswords(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
  hashPassword,
  generatePassword,
  comparePasswords,
};
