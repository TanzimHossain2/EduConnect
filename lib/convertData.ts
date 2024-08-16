// Define an interface that includes _id
interface WithId {
  _id: any; // Adjust the type of _id as needed (e.g., string or ObjectId)
  [key: string]: any; // This allows additional properties with any type
}

// Converts an array of objects with _id to an array with id
export const replaceMongoIdInArray = (array: WithId[]): { id: string; [key: string]: any }[] => {
  return array.map(item => {
    return {
      id: item._id.toString(),
      ...item
    };
  }).map(({ _id, ...rest }) => rest);
};

// Converts a single object with _id to an object with id
export const replaceMongoIdInObject = (obj: WithId): { id: string; [key: string]: any } => {
  const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
  return updatedObj;
};
