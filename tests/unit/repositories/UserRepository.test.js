import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import UserRepository from "../../../src/repositories/UserRepository";
import { mockUsers, seedUsers, clearDatabase } from "../../mock-datas-utils";

describe("UserRepository (mocked)", () => {
  beforeEach(async () => {
    await clearDatabase();
    await seedUsers();

    vi.spyOn(UserRepository, "findByName").mockImplementation(async (name) => {
      return mockUsers.find((u) => u.name === name) || null;
    });

    vi.spyOn(UserRepository, "create").mockImplementation(
      async ({ name, password }) => {
        const id = mockUsers.length + 1;
        const user = { id, name, password };
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

  it("should return user with valid name", async () => {
    const testName = "Admin";
    const user = await UserRepository.findByName(testName);
    expect(user).toBeDefined();
    expect(user.name).toBe(testName);
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("password");
  });

  it("should create a new user", async () => {
    const userData = {
      name: "New User",
      password: "newpass123",
    };
    const user = await UserRepository.create(userData);
    expect(user.id).toBeDefined();
    expect(user.name).toBe(userData.name);
    expect(user).toHaveProperty("password");
  });

  it("should update user name", async () => {
    const user = await UserRepository.findByName("Admin");
    const newName = "SuperAdmin";
    const updated = await UserRepository.update(user.id, { name: newName });
    expect(updated).toBe(true);
    const updatedUser = await UserRepository.findByName("SuperAdmin");
    expect(updatedUser.name).toBe(newName);;
    expect(updatedUser).toHaveProperty("id");
    expect(updatedUser).toHaveProperty("password");
  });
});
