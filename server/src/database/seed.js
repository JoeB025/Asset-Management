const db = require("./db");
const fs = require("fs");
const path = require("path");

const seedPath = path.join(__dirname, "seed.sql");

const seed = fs.readFileSync(seedPath, "utf8");

db.exec(seed, (err) => {
  if (err) {
    console.error("❌ Seed failed:", err.message);
  } else {
    console.log("🌱 Database seeded successfully");
  }

  db.close();
});