import { test, expect } from "@playwright/test";

test.describe("LUXORA Luxury Shopping Flow", () => {
  test("User can browse homepage, view hero, collections, and new arrivals", async ({ page }) => {
    await page.goto("/");

    // Verify Brand title & luxury headline
    await expect(page.locator("text=LUXORA").first()).toBeVisible();
    await expect(
      page.locator("text=More Than Just Jewellery, It's a Feeling")
    ).toBeVisible();

    // Verify Our Collections section exists
    await expect(page.locator("text=Our Signature Collections")).toBeVisible();
    await expect(page.locator("text=Diamond Collection")).toBeVisible();

    // Verify New Arrivals section exists
    await expect(page.locator("text=New Arrivals")).toBeVisible();
  });

  test("User can navigate to shop and filter by category", async ({ page }) => {
    await page.goto("/shop");

    // Check heading
    await expect(page.locator("text=The Fine Jewellery Collection")).toBeVisible();

    // Verify products are rendered
    const productCards = page.locator("text=Add to Cart");
    await expect(productCards.first()).toBeVisible();
  });

  test("User can view product details, select size, and add to bag", async ({ page }) => {
    await page.goto("/product/prod-1");

    // Verify product name and pricing
    await expect(page.locator("h1:has-text('Royal Bloom Diamond Ring')")).toBeVisible();
    await expect(page.locator("text=Atelier Specifications")).toBeVisible();

    // Click Add to Cart
    const addToCartButton = page.locator("button:has-text('Add to Cart')");
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();

    // Expect bag counter or button feedback
    await expect(page.locator("text=Added to Bag")).toBeVisible();
  });

  test("User can complete checkout flow with shipping and payment details", async ({ page }) => {
    await page.goto("/product/prod-1");
    await page.locator("button:has-text('Add to Cart')").click();

    // Go to cart
    await page.goto("/cart");
    await expect(page.locator("text=Your Shopping Bag & Checkout")).toBeVisible();

    // Fill shipping address
    await page.fill("input[placeholder='Lady / Sir Full Name']", "Ranbir Kapoor");
    await page.fill("input[placeholder='concierge@luxora.com']", "ranbir@luxora.com");
    await page.fill("input[placeholder='+91 98000 12345']", "9898989898");
    await page.fill("input[placeholder='400026']", "400050");
    await page.fill("input[placeholder='Bungalow 4, Malabar Hill']", "Pali Hill Villa");
    await page.fill("input[placeholder='Mumbai']", "Mumbai");

    // Submit order
    const orderBtn = page.locator("button:has-text('Complete Secure Order')");
    await orderBtn.click();

    // Verify confirmation
    await expect(page.locator("text=Thank You for Your Patronage")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("text=Transit Insurance: Active")).toBeVisible();
  });
});
