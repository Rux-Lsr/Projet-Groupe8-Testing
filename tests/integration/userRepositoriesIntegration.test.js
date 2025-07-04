import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createUser, getUserById, updateUser, deleteUser } from '../../src/repositories/UserRepository';
const pool = require("../../src/config/db");
// filepath: /home/wabo/Bureau/TP/TP_ICT304/Projet-Groupe8-Testing/tests/integration/userRepositoriesIntegration.test.js


describe('User Repository Integration Tests', () => {
    // beforeEach(async () => {
    //     await connectToDatabase();
    // });

    afterEach(async () => {
        // suppression apres le test
      await pool.query("DELETE FROM users");
    });

    it('devrait créer un nouvel utilisateur dans la base de données', async () => {
        const userData = { name: 'John Doe', email: 'john.doe@example.com' };
        const newUser = await createUser(userData);

        expect(newUser).toBeDefined();
        expect(newUser.name).toBe(userData.name);
        expect(newUser.email).toBe(userData.email);
    });

    it('devrait récupérer un utilisateur par ID dans la base de données', async () => {
        const userData = { name: 'Jane Doe', email: 'jane.doe@example.com' };
        const createdUser = await createUser(userData);
        const retrievedUser = await getUserById(createdUser.id);

        expect(retrievedUser).toBeDefined();
        expect(retrievedUser.id).toBe(createdUser.id);
        expect(retrievedUser.name).toBe(userData.name);
        expect(retrievedUser.email).toBe(userData.email);
    });

    it('devrait mettre à jour un utilisateur dans la base de données', async () => {
        const userData = { name: 'Alice', email: 'alice@example.com' };
        const createdUser = await createUser(userData);

        const updatedData = { name: 'Alice Updated', email: 'alice.updated@example.com' };
        const updatedUser = await updateUser(createdUser.id, updatedData);

        expect(updatedUser).toBeDefined();
        expect(updatedUser.name).toBe(updatedData.name);
        expect(updatedUser.email).toBe(updatedData.email);
    });

    it('devrait supprimer un utilisateur de la base de données', async () => {
        const userData = { name: 'Bob', email: 'bob@example.com' };
        const createdUser = await createUser(userData);

        const deletionResult = await deleteUser(createdUser.id);
        const retrievedUser = await getUserById(createdUser.id);

        expect(deletionResult).toBe(true);
        expect(retrievedUser).toBeNull();
    });
});