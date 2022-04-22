const toArray = (values: unknown) => {
  return Array.isArray(values) ? values : [values];
};

export default toArray;
