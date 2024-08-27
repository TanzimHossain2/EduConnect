import { ObjectId } from "mongodb";

//  Method 1: Using a simple function to handle only top-level objects/arrays and ObjectIds
interface WithId {
  _id: any;
  [key: string]: any;
}

// Converts an array of objects with _id to an array with id
export const replaceMongoIdInArray = (
  array: WithId[]
): { id: string; [key: string]: any }[] => {
  return array
    .map((item) => {
      return {
        id: item._id ? item._id.toString() : item.id,
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest);
};

// Converts a single object with _id to an object with id
export const replaceMongoIdInObject = (
  obj: WithId
): { id: string; [key: string]: any } | null => {
  if (!obj) return null;
  const { _id, ...updatedObj } = {
    ...obj,
    id: obj._id ? obj._id.toString() : obj.id,
  };
  return updatedObj;
};

/* Method 2: Using a recursive function to handle nested objects/arrays and ObjectIds
 Recursive function to replace _id with id in nested objects/arrays, including handling ObjectId and Date instances */

const replaceMongoIdRecursively = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => replaceMongoIdRecursively(item));
  } else if (obj && typeof obj === "object") {
    if (obj instanceof ObjectId) {
      // If obj is directly an ObjectId, return its string representation
      return obj.toHexString();
    } else if (obj instanceof Date) {
      // If obj is a Date, return it as it is
      return obj;
    }

    const { _id, ...rest } = obj;

    // Convert _id if it exists and is an ObjectId
    const updatedObj = {
      ...(!!_id && {
        id: _id instanceof ObjectId ? _id.toHexString() : _id.toString(),
      }),
      ...Object.keys(rest).reduce((acc, key) => {
        acc[key] = replaceMongoIdRecursively(rest[key]);
        return acc;
      }, {} as { [key: string]: any }),
    };

    return updatedObj;
  }

  return obj;
};

// Converts an array of objects with _id to an array with id, handling nested levels and ObjectIds
export const nestedReplaceMongoIdInArray = (
  array: any[]
): { id: string; [key: string]: any }[] => {
  return array.map((item) => replaceMongoIdRecursively(item));
};

// Converts a single object with _id to an object with id, handling nested levels and ObjectIds
export const nestedReplaceMongoIdInObject = (
  obj: any
): { id: string; [key: string]: any } | null => {
  if (!obj) return null;
  return replaceMongoIdRecursively(obj);
};
