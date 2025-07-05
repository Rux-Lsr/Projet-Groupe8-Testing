import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import UserRepository from "../../../src/repositories/UserRepository";
import {
  mockUsers,
  seedUsers,
  clearDatabase,
  mockVehicles,
} from "../../mock-datas-utils";

describe("UserRepository (mocked)", () => {
  beforeEach(async () => {
    await clearDatabase();
    await seedUsers();

    vi.spyOn(UserRepository, "getAll").mockImplementation(async () => {
      return mockUsers;
    });

    vi.spyOn(UserRepository, "delete").mockImplementation(async (id) => {
      const index = mockUsers.findIndex((u) => u.id === id);
      if (index === -1) return false;
      mockUsers.splice(index, 1);
      return true;
    });

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
    expect(updatedUser.name).toBe(newName);
    expect(updatedUser).toHaveProperty("id");
    expect(updatedUser).toHaveProperty("password");
  });

  it("should return all users", async () => {
    const users = await UserRepository.getAll();
    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty("id");
    expect(users[0]).toHaveProperty("name");
    expect(users[0]).toHaveProperty("password");
  });

  it("should delete an existing user", async () => {
    const user = await UserRepository.findByName("Admin");
    const result = await UserRepository.delete(user.id);
    expect(result).toBe(true);

    const deletedUser = await UserRepository.findByName("Admin");
    expect(deletedUser).toBeNull();
  });

  it("should fail to delete a non-existing user", async () => {
    const result = await UserRepository.delete(9999); // id qui n'existe pas
    expect(result).toBe(false);
  });
});
