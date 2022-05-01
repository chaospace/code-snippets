import nop from './nop';

const toNumber = (value: unknown) => {
  if (typeof value === 'string') {
    const nValue = parseFloat(value);
    return isNaN(nValue) ? nop : nValue;
  }
  return value ?? nop;
};

export default toNumber;
