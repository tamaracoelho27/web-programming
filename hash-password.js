const bcrypt = require("bcrypt");

async function hashPassword() {
  try {
    const plainPassword = "password123"; // Replace with the admin's password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log("Hashed Password:", hashedPassword);
  } catch (error) {
    console.error("Error hashing password:", error);
  }
}

hashPassword();
