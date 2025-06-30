const { test, expect } = require("@playwright/test");

test("Connexion avec identifiants valides", async ({ page }) => {
  await page.goto("http://localhost:5500/interfaces/login.html");
  await page.fill('input[name="name"]', "Admin");
  await page.fill('input[name="password"]', "admin123");
  await page.click('button[type="submit"]');
  await page.waitForURL("**/vehicles.html");
  // Vérifie que le token est bien stocké
  const token = await page.evaluate(() => localStorage.getItem("accessToken"));
  expect(token).not.toBeNull();
});
