import nop from './nop';

const toNumber = (value: any) => {
  if (typeof value === 'string') {
    const nValue = parseFloat(value);
    return isNaN(nValue) ? nop : nValue;
  }
  return value ?? nop;
};

export default toNumber;
