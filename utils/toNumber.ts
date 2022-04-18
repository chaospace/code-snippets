import nop from "./nop";
/* eslint-disable @typescript-eslint/no-explicit-any */
const toNumber = (value: any) => {
  if (typeof value === "string") {
    const nValue = parseFloat(value);
    return isNaN(nValue) ? nop : nValue;
  }
  return value ?? nop;
};

export default toNumber;
