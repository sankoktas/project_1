import { serve, configure } from "./deps.js";
import * as kontrolListesi from "./controllers/kontrolListesi.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

////////////////////////////////
///                          ///
///                          ///
///                          ///
///                          ///
///     REQUEST HANDLING     ///
///                          ///
///                          ///
///                          ///
///                          ///
////////////////////////////////

// Define the main request handling function
const handleRequest = async (query) => {
  const url = new URL(query.url);

  ////////////////////////////////
  ///                          ///
  ///                          ///
  ///      POST REQUESTS       ///
  ///                          ///
  ///                          ///
  ////////////////////////////////

  // Handle POST requests
  if (query.method === "POST") {
    if (url.pathname.includes("collect")) {
      // Handle item collection
      const list_identification = url.pathname.split("/")[2];
      const item_identification = url.pathname.split("/")[4];
      return await kontrolListesi.markItemAsCollected(query, list_identification, item_identification);
    } else if (url.pathname.includes("items")) {
      // Handle adding an item to the shopping list
      const identification = url.pathname.split("/")[2];
      return await kontrolListesi.addNewItem(query, identification);
    } else if (url.pathname.includes("deactivate")) {
      // Handle deactivating a shopping list
      const identification = url.pathname.split("/")[2];
      return await kontrolListesi.deactivateList(query, identification);
    } else if (url.pathname.startsWith("/lists")) {
      // Handle adding a new shopping list
      return await kontrolListesi.addNewShoppingList(query);
    }
  } 

  ////////////////////////////////
  ///                          ///
  ///                          ///
  ///       GET REQUESTS       ///
  ///                          ///
  ///                          ///
  ////////////////////////////////

  // Handle GET requests
  else if (query.method === "GET") {
    if (url.pathname.startsWith("/lists/")) {
      // Handle getting items of a shopping list
      const identification = url.pathname.split("/")[2];
      return await kontrolListesi.retrieveItems(query, identification);
    } else if (url.pathname.startsWith("/lists")) {
      // Handle getting existing active shopping lists
      return await kontrolListesi.retrieveLists(query);
    }
  }

  // Default: Show the main page
  return await kontrolListesi.anaSayfa(query);
};

// Start the server and listen on port 7777
serve(handleRequest, { port: 7777 });
