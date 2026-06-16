const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.Id,
      emailAddress: user.EmailAddress,
      username: user.Username,
      role: user.Role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

module.exports = { generateToken };