export function convertFilterToParams(filter: any) {
  const params = { ...filter };
  
  // Remove undefined values
  Object.keys(params).forEach((key) => {
    if (params[key] === undefined) {
      delete params[key];
    }
  });

  return params;
}
