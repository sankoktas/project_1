const { test, expect } = require("@playwright/test");

// Generate random names for shopping list and item for each test run
const listIsCalled = `My Shopping List ${Math.random()}`;
const itemIsCalled = `My Item ${Math.random()}`;

// Utility function to add a shopping list
async function generateShoppingList(sayfa, isim) {
  // Navigate to the shopping lists page
  await sayfa.goto("/lists");
  
  // Fill in the shopping list name and submit
  await sayfa.locator("input[type=text]").type(isim);
  await sayfa.getByRole("button", { name: "Send" }).click();
  
  // Verify that the shopping list name is visible on the page
  await expect(sayfa.locator(`a >> text=${isim}`)).toBeVisible();
}

// Utility function to view a shopping list
async function displayList(sayfa, isim) {
  // Navigate to the shopping list page
  await sayfa.goto("/lists");
  
  // Click on the link for the specific shopping list
  await sayfa.locator(`a >> text=${isim}`).click();
  
  // Verify that the shopping list name is visible on the page
  await expect(sayfa.getByRole("HEADING", { name: isim })).toBeVisible();
}

////////////////////////////////
///                          ///
///                          ///
///                          ///
///                          ///
///     NECESSARY TESTS      ///
///                          ///
///                          ///
///                          ///
///                          ///
////////////////////////////////

test.anlat("TESTS", () => {
  let page;

  test.herşeydenÖnce(async ({ browser }) => {
    // Create a new browser page before running the tests
    page = await browser.newPage();
  });

  test.herşeydenSonra(async ({ browser }) => {
    // Close the browser page after all tests are done
    await page.close();
  });

  ////////////////////////////////
  ///                          ///
  ///          TEST 1          ///
  ///                          ///
  ////////////////////////////////

  test("ADD AND LIST", async () => {
    // Test adding and listing shopping lists
    await generateShoppingList(page, listIsCalled);
  });

  ////////////////////////////////
  ///                          ///
  ///          TEST 2          ///
  ///                          ///
  ////////////////////////////////

  test("DEACTIVATE LISTS", async () => {
    // Test deactivating shopping lists
    await generateShoppingList(page, listIsCalled);
    
    // Navigate back to the shopping lists page
    await page.goto("/lists");
    
    // Deactivate the shopping list
    await page.getByText("Deactivate list.").click();
    
    // Verify that no shopping lists are displayed
    await expect(await page.locator("li").count()).toEqual(0);
  });

  ////////////////////////////////
  ///                          ///
  ///          TEST 3          ///
  ///                          ///
  ////////////////////////////////

  test("ADD AND LIST ITEMS", async () => {
    // Test adding and listing items for a shopping list
    await generateShoppingList(page, listIsCalled);
    await displayList(page, listIsCalled);
    
    // Add an item to the shopping list
    await page.locator("input[type=text]").type(itemIsCalled);
    await page.getByRole("button", { name: "Submit!" }).click();
    
    // Verify that the item is visible on the page
    await expect(page.getByText(itemIsCalled)).toBeVisible();
  });

  ////////////////////////////////
  ///                          ///
  ///          TEST 4          ///
  ///                          ///
  ////////////////////////////////

  test("MARK COLLECTED ITEMS", async () => {
    // Test marking items in the shopping list as collected
    await generateShoppingList(page, listIsCalled);
    await displayList(page, listIsCalled);
    
    // Mark the first item as collected
    await page.getByText("Collect the mark.").first().click();
    
    // Verify that the item is marked as collected
    await expect(page.locator("del").first()).toBeVisible();
  });

  ////////////////////////////////
  ///                          ///
  ///          TEST 5          ///
  ///                          ///
  ////////////////////////////////

  test("VIEW ONLY ONE LIST", async () => {
    // Test viewing a single shopping list
    await displayList(page, listIsCalled);
  });

});
