import isNumber from './isNumber';
import nop from './nop';

const toNumber = (value: any) => {
  const nValue = typeof value === 'string' ? parseFloat(value) : value;
  return isNumber(nValue) ? nValue : nop;
};

export default toNumber;
