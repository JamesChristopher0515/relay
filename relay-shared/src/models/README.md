## models

This directory contains the core data models and utility functions used throughout the application. It provides a consistent and reliable way to interact with and manipulate the underlying data, ensuring data integrity and consistency across the codebase.

### Files

#### ./models/helpers/idCompare.ts

This file exports a utility function `idCompare` that compares IDs in a safe way, regardless of whether the ID is of type `ObjectId` or a simple string. This is important for ensuring consistent and reliable ID comparisons across the backend and frontend of the application.

#### ./models/helpers/idEq.ts

This file exports two utility functions: `idEq` and `findId`. `idEq` is similar to `idCompare`, providing a safe way to compare IDs. `findId` is a helper function that finds an element in an array by its ID and returns both the element and its index.

#### ./models/helpers/idOrFromObj.ts

This file exports a utility function `idOrFromObj` that extracts the ID from an object, regardless of whether the object is a string, a MongoDB document, or an object with a `toJSON` method. This is useful for ensuring consistent handling of IDs across the application.

#### ./models/helpers/mongoSpreadSafe.ts

This file exports a utility function `mongoSpreadSafe` that safely spreads the contents of a MongoDB document object. This is necessary because directly spreading a MongoDB document object can lead to unexpected results in certain cases.

#### ./models/helpers/safeMongoObj.ts

This file exports a utility function `safeMongoObj` that ensures a given object is a standard JavaScript object, even if it is a MongoDB document object. This is important for avoiding unexpected behavior when using MongoDB document objects in certain contexts.