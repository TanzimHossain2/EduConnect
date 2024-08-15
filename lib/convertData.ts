export const replaceMongoIdInArray = <T extends { _id: any }>(array: T[]): (Omit<T, '_id'> & { id: string })[] => {
    const mappedArray = array
      .map((item) => {
        return {
          id: item._id.toString(),
          ...item,
        };
      })
      .map(({ _id, ...rest }) => rest as Omit<T, '_id'> & { id: string });
  
    return mappedArray;
  };
  
  export const replaceMongoIdInObject = <T extends { _id: any }>(obj: T): Omit<T, '_id'> & { id: string } => {
    const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
    return updatedObj as Omit<T, '_id'> & { id: string };
  };