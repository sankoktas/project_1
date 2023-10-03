// Import the necessary module for database connection pooling
import { Pool } from "../deps.js";

// Declare a variable to hold the connection pool
let connectionManager;

// Define the maximum number of concurrent database connections
const MAX_NUMBER_OF_CONNECTIONS = 5;


////////////////////////////////
///                          ///
///                          ///
///     CONNECTION POOL      ///
///                          ///
///                          ///
////////////////////////////////


// Check if the DATABASE_URL environment variable is set
if (Deno.env.get("DATABASE_URL")) {
  // If DATABASE_URL is set, create a connection pool with the URL
  connectionManager = new Pool(Deno.env.get("DATABASE_URL"), MAX_NUMBER_OF_CONNECTIONS);
} else {
  // If DATABASE_URL is not set, create an empty connection pool with a limit
  connectionManager = new Pool({}, MAX_NUMBER_OF_CONNECTIONS);
}

////////////////////////////////
///                          ///
///                          ///
///    EXECUTING QUERIES     ///
///                          ///
///                          ///
////////////////////////////////


// Define a function to execute a database query with optional parameters
const executeQuery = async (search, argumentsList) => {
  // Create an empty response object to hold query results or errors
  const çıktı_1 = {};
  // Declare a variable to hold the database client
  let client;

  try {
    // Acquire a connection from the connection pool
    client = await connectionManager.connect();

    // Execute the database query with optional parameters
    const çıktı_2 = await client.queryObject(search, argumentsList);

    // Check if the query result contains rows
    if (çıktı_2.rows) {
      // If rows are present, store them in the response object
      çıktı_1.rows = çıktı_2.rows;
    }

  ////////////////////////////////
  ///                          ///
  ///                          ///
  ///      CATCHING AND        ///
  ///     HANDLING ERRORS      ///
  ///                          ///
  ///                          ///
  ////////////////////////////////

  } catch (hata) {
    // If an error occurs during query execution, store it in the response object
    çıktı_1.error = hata;
  } finally {
    // Ensure that the database client is released back to the connection pool
    if (client) {
      try {
        await client.release();
      } catch (hata) {
        // Handle any errors that may occur during client release
        console.log("Unable to release database connection.");
        console.log(hata);
      }
    }
  }

  // Return the response object containing query results or errors
  return çıktı_1;
};

// Export the fetchResultSetFromQuery function for use in other parts of the application
export { executeQuery as executeQueryAndGetResults };