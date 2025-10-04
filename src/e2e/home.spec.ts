import {expect, test} from "@playwright/test"

test("has title", async ({page}) => {
  await page.goto("/")

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/John James Blog/)
})

test("page visual snapshot", async ({page}) => {
  await page.goto("/")

  // Take a screenshot and compare against baseline
  await expect(page).toHaveScreenshot("home-page.png", {
    fullPage: true,
  })
})
