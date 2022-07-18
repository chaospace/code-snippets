import isArray from './isArray';
import isObject from './isObjext';
const toArray = (values: unknown): any[] => {
  return (
    isArray(values) ? values : (isObject(values) && Object.values(values as Object)) || [values]
  ) as any[];
};

export default toArray;
