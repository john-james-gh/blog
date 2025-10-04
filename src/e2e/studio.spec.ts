import {expect, test} from "@playwright/test"

test("smoke test", async ({page}) => {
  await page.goto("/studio")

  await expect(page.getByText("Choose login provider")).toBeVisible()
})
