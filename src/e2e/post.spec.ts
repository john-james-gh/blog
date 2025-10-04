import {expect, test} from "@playwright/test"

test("has title", async ({page}) => {
  await page.goto("/posts/how-to-decorate-a-cake-like-a-pro")

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/How to Decorate a Cake Like a Pro/)
})

test("page visual snapshot", async ({page}) => {
  await page.goto("/posts/how-to-decorate-a-cake-like-a-pro")

  // Take a screenshot and compare against baseline
  await expect(page).toHaveScreenshot("post-page.png", {
    fullPage: true,
    maxDiffPixelRatio: 0.02, // Allow 2% pixel difference for cross-platform rendering
  })
})
