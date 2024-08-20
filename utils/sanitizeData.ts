export const sanitizeData = (data: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== '' && value !== undefined)
    );
  };




  export const nestedSanitizeData = (data: any): any => {
    if (Array.isArray(data)) {
      return data
        .map((item) => nestedSanitizeData(item))
        .filter((item) => !(item === undefined || item === ''));
    } else if (typeof data === 'object' && data !== null) {
      return Object.entries(data).reduce((acc, [key, value]) => {
        const sanitizedValue = nestedSanitizeData(value);
        if (
          sanitizedValue !== undefined &&
          sanitizedValue !== '' &&
          (typeof sanitizedValue !== 'object' || (typeof sanitizedValue === 'object' && Object.keys(sanitizedValue).length > 0))
        ) {
          acc[key] = sanitizedValue;
        }
        return acc;
      }, {} as Record<string, any>);
    } else {
      return data;
    }
  };
  