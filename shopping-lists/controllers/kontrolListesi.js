// Import necessary dependencies and modules
import { renderFile } from "../deps.js";
import * as servisListesi from "../services/servisListesi.js";

// Define common response details
const detaylar = {
  headers: {
    "Content-Type": "text/html;charset=UTF-8"
  }
};

////////////////////////////////
///                          ///
///                          ///
///                          ///
///   NECESSARY FUNCTIONS    ///
///                          ///
///                          ///
///                          ///
////////////////////////////////


////////////////////////////////
///                          ///
///       FUNCTION 1:        ///
///                          ///
////////////////////////////////

// Helper function to redirect to a different page
function transferTo(destination) {
  return new Promise((resolve) => {
    resolve(new Response(`Transferring to ${destination}.`, {
      status: 303,
      headers: {
        "Location": destination
      }
    }));
  });
}

////////////////////////////////
///                          ///
///       FUNCTION 2:        ///
///                          ///
////////////////////////////////

// Handler for retrieving lists
async function retrieveLists(request) {
  // Fetch the list of shopping lists from servisListesi
  const data = {
    lists: await servisListesi.retrieveLists()
  };

  // Render the lists page and return it as a response
  return new Promise(async (resolve) => {
    resolve(new Response(await renderFile("lists.eta", data), detaylar));
  });
}

////////////////////////////////
///                          ///
///       FUNCTION 3:        ///
///                          ///
////////////////////////////////

// Handler for retrieving items in a specific list
async function retrieveItems(request, identification) {
  // Fetch the list and items associated with the given ID
  const data = {
    list: await servisListesi.retrieveList(identification),
    items: await servisListesi.retrieveItems(identification),
    postPath: `/lists/${identification}/items`
  };

  // Render the items page and return it as a response
  return new Promise(async (resolve) => {
    resolve(new Response(await renderFile("items.eta", data), detaylar));
  });
}

////////////////////////////////
///                          ///
///       FUNCTION 4:        ///
///                          ///
////////////////////////////////

// Handler for adding a new shopping list
async function addNewShoppingList(request) {
  // Retrieve form data to extract the new list name
  const formData = await request.formData();
  const name = formData.get("name");

  // Add the new list using servisListesi
  await servisListesi.addNewShoppingList(name);

  // Redirect to the lists page after adding the list
  return transferTo("/lists");
}

////////////////////////////////
///                          ///
///       FUNCTION 5:        ///
///                          ///
////////////////////////////////

// Handler for adding a new item to a shopping list
async function addNewItem(request, shoppingListId) {
  // Retrieve form data to extract the item name
  const formData = await request.formData();
  const name = formData.get("name");

  // Add the new item to the specified shopping list
  await servisListesi.addNewItem(name, shoppingListId);

  // Redirect to the list's items page after adding the item
  return transferTo(`/lists/${shoppingListId}`);
}

////////////////////////////////
///                          ///
///       FUNCTION 6:        ///
///                          ///
////////////////////////////////

// Handler for deactivating a shopping list
async function deactivateList(request, identification) {
  // Deactivate the specified shopping list using servisListesi
  await servisListesi.deactivateList(identification);

  // Redirect to the lists page after deactivating the list
  return transferTo("/lists");
}

////////////////////////////////
///                          ///
///       FUNCTION 7:        ///
///                          ///
////////////////////////////////

// Handler for marking an item as collected
async function markItemAsCollected(request, shoppingListId, itemId) {
  // Mark the specified item as collected using servisListesi
  await servisListesi.markItemAsCollected(itemId);

  // Redirect to the list's items page after marking the item as collected
  return transferTo(`/lists/${shoppingListId}`);
}

////////////////////////////////
///                          ///
///       FUNCTION 8:        ///
///                          ///
////////////////////////////////

// Handler for the main page
async function anaSayfa(request) {
  // Fetch statistics data from the servisListesi
  const data = {
    stats: await servisListesi.retrieveStatistics()
  };

  // Render the main page and return it as a response
  return new Promise(async (resolve) => {
    resolve(new Response(await renderFile("index.eta", data), detaylar));
  });
}

// Export all the defined handlers for use in other modules
export {
  anaSayfa as anaSayfa,
  retrieveLists as retrieveLists,
  retrieveItems as retrieveItems,
  addNewShoppingList as addNewShoppingList,
  addNewItem as addNewItem,
  deactivateList,
  markItemAsCollected as markItemAsCollected
};
