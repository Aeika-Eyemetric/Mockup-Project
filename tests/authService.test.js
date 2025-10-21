const { registerUser, loginUser } = require("../src/authService");
const { clearUsers } = require("../src/usersDB");

describe("Authentication Service", () => {
  beforeEach(() => {
    clearUsers();
  });

  test("registers a new user successfully", async () => {
    const result = await registerUser("test@example.com", "password123");
    expect(result).toEqual({
      email: "test@example.com",
      message: "Registration successful",
    });
  });

  test("throws error if email already exists", async () => {
    await registerUser("duplicate@example.com", "secret");
    await expect(registerUser("duplicate@example.com", "newpass")).rejects.toThrow(
      "User already exists"
    );
  });

  test("throws error if fields are missing", async () => {
    await expect(registerUser("", "pass")).rejects.toThrow(
      "Email and password are required"
    );
  });

  test("logs in with valid credentials", async () => {
    await registerUser("login@test.com", "mypassword");
    const result = await loginUser("login@test.com", "mypassword");
    expect(result.message).toBe("Login successful");
  });

  test("throws error for incorrect password", async () => {
    await registerUser("wrongpass@test.com", "correctpass");
    await expect(loginUser("wrongpass@test.com", "badpass")).rejects.toThrow(
      "Invalid credentials"
    );
  });

  test("throws error for non-existent user", async () => {
    await expect(loginUser("nouser@test.com", "password")).rejects.toThrow(
      "User not found"
    );
  });
});