// const authService = require("../services/authService");

// const login = async (req, res) => {

//   console.log("🔥 LOGIN ENDPOINT HIT");

//   try {
//     const { username, password } = req.body;

//     const result = await authService.login(username, password);

//     res.json(result);
//   } catch (err) {
//     res.status(401).json({ message: err.message });
//   }
// };

// module.exports = { login };


const authService = require("../services/authService");

const login = async (req, res) => {
  console.log("🔥 LOGIN ENDPOINT HIT");

  try {
    const { emailAddress, password } = req.body;

    const result = await authService.login(emailAddress, password);

    res.json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { login };