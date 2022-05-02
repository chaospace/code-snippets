import isArray from './isArray';
const toArray = (values: unknown) => {
  return isArray(values) ? values : [values];
};

export default toArray;
