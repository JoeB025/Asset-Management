const db = require("../database/db");
const { comparePassword } = require("../utils/hash");
const { generateToken } = require("../utils/jwt");

const login = (username, password) => {

  console.log("Login attempt:", { username, password });

  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM LoginUsers
      WHERE Username = ? AND IsActive = 1
    `;

    db.get(sql, [username], async (err, user) => {
      console.log("SQL RESULT USER:", user);
      if (err) return reject(err);

      if (!user) {
        return reject(new Error("Invalid credentials"));
      }

      const valid = await comparePassword(password, user.PasswordHash);

      if (!valid) {
        return reject(new Error("Invalid credentials"));
      }

      const token = generateToken(user);

      console.log("USER FROM DB:", user);

      resolve({
        token,
        user: {
          id: user.Id,
          username: user.Username,
          role: user.Role,
        },
      });
    });
  });
};

module.exports = { login };