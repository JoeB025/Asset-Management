require("dotenv").config({ path: "../.env" });

const app = require("./app");
const db = require("./database/db");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 5000;

// load schema
const schemaPath = path.join(__dirname, "database", "schema.sql");

const schema = fs.readFileSync(schemaPath, "utf8");

db.exec(schema, (err) => {
  if (err) {
    console.error("❌ Schema load error:", err.message);
  } else {
    console.log("✅ Database schema loaded");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});