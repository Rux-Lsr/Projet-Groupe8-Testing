const { test, expect } = require("@playwright/test");

test("Affichage de la liste des véhicules après login", async ({ page }) => {
  // Connexion
  await page.goto("http://localhost:5500/interfaces/login.html");
  await page.fill('input[name="name"]', "Admin");
  await page.fill('input[name="password"]', "admin123");
  await page.click('button[type="submit"]');
  await page.waitForURL("**/vehicles.html");
  // Vérifie la présence du tableau
  await expect(page.locator("table#vehiclesTable")).toBeVisible();
  // Vérifie qu'il y a au moins un véhicule
  await expect(
    page.locator("table#vehiclesTable tbody tr")
  ).toHaveCountGreaterThan(0);
});
