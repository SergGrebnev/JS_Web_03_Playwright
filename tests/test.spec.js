const { test, expect } = require("@playwright/test");
const { email, pass } = require("../user");

test("Successful authorization", async ({ page }) => {
  test.setTimeout(180_000);
  await page.goto("https://netology.ru/?modal=sign_in", { timeout: 60_000 });
  await page.getByPlaceholder("Email").click({ timeout: 60_000 });
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(pass);
  await page.getByTestId("login-submit-btn").click();

  // Expect a title "to contain" a substring.
  await expect(
    page.locator(
      ".------libs-shared-src-reallyShared-components-User--profileText--vDqvQ"
    )
  ).toContainText("Моё обучение", { timeout: 150_000 });
});

test("Failed authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in", { timeout: 60_000 });
  await page.getByPlaceholder("Email", { timeout: 60_000 }).click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill("pass");
  await page.getByTestId("login-submit-btn").click();

  // Expect a title "to contain" a substring.
  await expect(
    page.locator(".hint_hint__bpsEa.inputHint", { timeout: 150_000 })
  ).toContainText("Вы ввели неправильно логин или пароль.");
});
