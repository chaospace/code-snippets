import isArray from './isArray';
import isObject from './isObjext';
const toArray = (values: unknown) => {
  return isArray(values)
    ? values
    : (isObject(values) && Object.values(values as Object)) || [values];
};

export default toArray;
