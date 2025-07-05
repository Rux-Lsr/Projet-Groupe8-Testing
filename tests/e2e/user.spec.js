const { test, expect } = require("@playwright/test");

test("Ajout d'un utilisateur et vérification dans la liste", async ({
  page,
}) => {
  // Connexion
  await page.goto("http://localhost:5500/login.html");
  await page.fill('input[name="name"]', "Admin");
  await page.fill('input[name="password"]', "admin123");
  await page.click('button[type="submit"]');
  await page.waitForURL("http://localhost:5500/vehicle.html");
  // Aller à la page utilisateurs
  await page.click('a[href="/users.html"]');
  await page.waitForURL("http://localhost:5500/users.html");
  // Ajouter un utilisateur
  await page.click("button.add-btn");
  await page.fill('input[name="name"]', "TestUser");
  await page.fill('input[name="password"]', "testpass");
  await page.click('form#addUserForm button[type="submit"]');
  // Vérifier que l'utilisateur apparaît dans la liste
  await expect(page.locator("table#usersTable")).toContainText("TestUser");
});
