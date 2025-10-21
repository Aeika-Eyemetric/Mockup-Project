const users = [];

function findUserByEmail(email) {
  return users.find((user) => user.email === email);
}

function addUser(user) {
  users.push(user);
  return user;
}

function clearUsers() {
  users.length = 0;
}

module.exports = { findUserByEmail, addUser, clearUsers };