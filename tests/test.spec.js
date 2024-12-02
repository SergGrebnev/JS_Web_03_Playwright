const { test, expect } = require("@playwright/test");
const { email, pass } = require("../user");

test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(pass);
  await page.getByTestId("login-submit-btn").click();

  // Expect a title "to contain" a substring.
  await expect(page.locator("[data-testid='header-top']")).toContainText(
    "Моё обучение",
  );
  // await expect(
  //   page.locator(
  //     "[.------libs-shared-src-reallyShared-components-MenuLink--info--XyT0U]",
  //   ),
  // ).toContainText(email);
});

// test("Failed authorization", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" }),
//   ).toBeVisible();
// });
