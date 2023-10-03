// Import the fetchResultSetFromQuery function from the database module
import { executeQueryAndGetResults as executeQueryAndGetResults } from "../database/database.js";

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

// Function to retrieve details of a specific shopping list by ID
const retrieveList = async (identification) => {
  // Query the database to retrieve details of a specific shopping list by ID
  const result = await executeQueryAndGetResults(
    "SELECT id, name, active FROM shopping_lists WHERE id = $id;",
    { id: identification }
  );

  // Return the details of the specified shopping list
  return result.rows[0];
};

////////////////////////////////
///                          ///
///       FUNCTION 2:        ///
///                          ///
////////////////////////////////

// Function to retrieve items of a specific shopping list by ID
const retrieveItems = async (identification) => {
  // Query the database to retrieve items of a specific shopping list by ID
  const result = await executeQueryAndGetResults(
    "SELECT * FROM shopping_list_items WHERE shopping_list_id = $shopping_list_id ORDER BY collected ASC, name ASC;",
    { shopping_list_id: identification }
  );

  // Return the items of the specified shopping list
  return result.rows;
};

////////////////////////////////
///                          ///
///       FUNCTION 3:        ///
///                          ///
////////////////////////////////

// Function to retrieve active shopping lists
const retrieveLists = async () => {
  // Query the database to retrieve active shopping lists
  const result = await executeQueryAndGetResults(
    "SELECT id, name, active FROM shopping_lists WHERE active = TRUE ORDER BY id;"
  );

  // Return the list of active shopping lists
  return result.rows;
};

////////////////////////////////
///                          ///
///       FUNCTION 4:        ///
///                          ///
////////////////////////////////

// Function to retrieve statistics about shopping lists and items
const retrieveStatistics = async () => {
  // Query the database to retrieve all shopping lists
  const lists = await executeQueryAndGetResults("SELECT * FROM shopping_lists;");
  // Query the database to retrieve all shopping list items
  const items = await executeQueryAndGetResults("SELECT * FROM shopping_list_items;");

  // Calculate statistics based on the query results
  const stats = {
    lists: lists.rows.length,
    items: items.rows.length
  };

  // Return the calculated statistics
  return stats;
};

////////////////////////////////
///                          ///
///       FUNCTION 5:        ///
///                          ///
////////////////////////////////

// Function to mark an item as collected
const markItemAsCollected = async (identification) => {
  // Update the collected status of a specific item in the database
  await executeQueryAndGetResults(
    "UPDATE shopping_list_items SET collected = TRUE WHERE id = $id;",
    { id: identification }
  );
};

////////////////////////////////
///                          ///
///       FUNCTION 6:        ///
///                          ///
////////////////////////////////

// Function to deactivate a specific shopping list
const deactivateList = async (identification) => {
  // Update the active status of a specific shopping list in the database
  await executeQueryAndGetResults(
    "UPDATE shopping_lists SET active = FALSE WHERE id = $id;",
    { id: identification }
  );
};

////////////////////////////////
///                          ///
///       FUNCTION 7:        ///
///                          ///
////////////////////////////////

// Function to add a new item to a specific shopping list
const addNewItem = async (isim, identification) => {
  // Insert a new item into a specific shopping list in the database
  await executeQueryAndGetResults(
    "INSERT INTO shopping_list_items (name, shopping_list_id) VALUES ($name, $shopping_list_id);",
    { name: isim, shopping_list_id: identification }
  );
};

////////////////////////////////
///                          ///
///       FUNCTION 8:        ///
///                          ///
////////////////////////////////

// Function to add a new shopping list
const addNewShoppingList = async (identification) => {
  // Insert a new shopping list into the database
  await executeQueryAndGetResults(
    "INSERT INTO shopping_lists (name) VALUES ($name);",
    { name: identification }
  );
};

////////////////////////////////
///                          ///
///        EXPORT ALL        ///
///                          ///
////////////////////////////////

// Export all the defined functions for use in other parts of the application
export { 
  addNewShoppingList as addNewShoppingList, 
  addNewItem as addNewItem, 
  deactivateList, 
  markItemAsCollected as markItemAsCollected, 
  retrieveStatistics as retrieveStatistics, 
  retrieveLists as retrieveLists, 
  retrieveList as retrieveList, 
  retrieveItems as retrieveItems 
};
