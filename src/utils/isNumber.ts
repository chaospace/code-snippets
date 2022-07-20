// 숫자형 여부 판단

const isNumber = (value: unknown): value is number => {
  return Number.isNaN(value) === false;
};

export default isNumber;
