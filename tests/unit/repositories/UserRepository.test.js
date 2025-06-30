import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import UserRepository from "../../../src/repositories/UserRepository";
import { mockUsers, seedUsers, clearDatabase } from "../../mock-datas-utils";

describe("UserRepository (mocked)", () => {
  beforeEach(async () => {
    await clearDatabase();
    await seedUsers();

    vi.spyOn(UserRepository, "findByEmail").mockImplementation(
      async (email) => {
        return mockUsers.find((u) => u.email === email) || null;
      }
    );

    vi.spyOn(UserRepository, "create").mockImplementation(
      async ({ name, email, password }) => {
        const id = mockUsers.length + 1;
        const user = { id, name, email, password };
        mockUsers.push(user);
        return user;
      }
    );

    vi.spyOn(UserRepository, "update").mockImplementation(
      async (id, userData) => {
        const user = mockUsers.find((u) => u.id === id);
        if (!user) return false;
        Object.assign(user, userData);
        return true;
      }
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return user with valid email", async () => {
    const testEmail = "admin@propelize.com";
    const user = await UserRepository.findByEmail(testEmail);
    expect(user).toBeDefined();
    expect(user.email).toBe(testEmail);
  });

  it("should create a new user", async () => {
    const userData = {
      name: "New User",
      email: "new@propelize.com",
      password: "newpass123",
    };
    const user = await UserRepository.create(userData);
    expect(user.id).toBeDefined();
    expect(user.name).toBe(userData.name);
  });

  it("should update user name", async () => {
    const user = await UserRepository.findByEmail("admin@propelize.com");
    const newName = "SuperAdmin";
    const updated = await UserRepository.update(user.id, { name: newName });
    expect(updated).toBe(true);
    const updatedUser = await UserRepository.findByEmail("admin@propelize.com");
    expect(updatedUser.name).toBe(newName);
  });
});
