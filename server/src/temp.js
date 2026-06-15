// const bcrypt = require("bcryptjs");

// bcrypt.hash("admin123", 10).then(console.log);


const bcrypt = require("bcryptjs");

const password = "admin123";

bcrypt.hash(password, 10).then(hash => {
  console.log("admin123 hash:", hash);
});