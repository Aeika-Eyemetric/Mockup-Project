const { findUserByEmail, addUser } = require("./usersDB");
const bcrypt = require("bcryptjs");

async function registerUser(email, password) {
  if (!email || !password) throw new Error("Email and password are required");

  const existing = findUserByEmail(email);
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);
  const user = addUser({ email, password: hashed });
  return { email: user.email, message: "Registration successful" };
}

async function loginUser(email, password) {
  if (!email || !password) throw new Error("Email and password are required");

  const user = findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  return { email: user.email, message: "Login successful" };
}

module.exports = { registerUser, loginUser };