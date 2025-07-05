const { test, expect } = require("@playwright/test");

test("Connexion avec identifiants valides", async ({ page }) => {
  // --- Arrange ---
  await page.goto("http://localhost:5500/login.html");

  // --- Act ---
  await page.fill('input[name="name"]', "Admin");
  await page.fill('input[name="password"]', "admin123");
  await page.click('button[type="submit"]');

  await page.waitForURL("http://localhost:5500/vehicle.html");

  // --- Assert ---
  const token = await page.evaluate(() => localStorage.getItem("accessToken"));
  expect(token).not.toBeNull();
});
