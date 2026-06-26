const db = require("../database/db");
const { comparePassword } = require("../utils/hash");
const { generateToken } = require("../utils/jwt");

const login = (emailAddress, password) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM LoginUsers
      WHERE EmailAddress = ? AND IsActive = 1
    `;

    db.get(sql, [emailAddress], async (err, user) => {
      // console.log("SQL RESULT USER:", user);

      if (err) return reject(err);

      if (!user) {
        return reject(new Error("Invalid credentials"));
      }

      const valid = await comparePassword(password, user.PasswordHash);

      if (!valid) {
        return reject(new Error("Invalid credentials"));
      }

      const token = generateToken(user);

      resolve({
        token,
        user: {
          id: user.Id,
          emailAddress: user.EmailAddress,
          username: user.Username, // display only
          role: user.Role,
        },
      });
    });
  });
};

module.exports = { login };