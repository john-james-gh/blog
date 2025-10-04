import {expect, test} from "@playwright/test"

test("has title", async ({page}) => {
  await page.goto("/posts/how-to-decorate-a-cake-like-a-pro")

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/How to Decorate a Cake Like a Pro/)
})
