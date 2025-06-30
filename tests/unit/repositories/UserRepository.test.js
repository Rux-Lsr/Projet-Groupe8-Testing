import { describe, it, expect, beforeEach, afterEach } from "vitest";
import UserRepository from "../../../src/repositories/UserRepository";
import { seedUsers, clearDatabase } from "../../test-utils";

describe("UserRepository", () => {
  beforeEach(async () => {
    await clearDatabase();
    await seedUsers();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  describe("findByEmail()", () => {
    it("should return user with valid email", async () => {
      const testEmail = "admin@propelize.com";
      const user = await UserRepository.findByEmail(testEmail);
      expect(user).toBeDefined();
      expect(user.email).toBe(testEmail);
    });

    it("should return null for non-existent email", async () => {
      const invalidEmail = "nonexistent@test.com";
      const user = await UserRepository.findByEmail(invalidEmail);
      expect(user).toBeNull();
    });
  });

  describe("create()", () => {
    it("should create a new user", async () => {
      const userData = {
        name: "New User",
        email: "new@propelize.com",
        password: "newpass123",
      };
      const user = await UserRepository.create(userData);
      expect(user.id).toBeDefined();
      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
    });
  });

  describe("update()", () => {
    it("should update user name", async () => {
      // Arrange
      const user = await UserRepository.findByEmail("admin@propelize.com");
      const newName = "SuperAdmin";

      // Act
      const updated = await UserRepository.update(user.id, { name: newName });
      const updatedUser = await UserRepository.findByEmail("admin@propelize.com");

      // Assert
      expect(updated).toBe(true);
      expect(updatedUser.name).toBe(newName);
    });
  });
});
