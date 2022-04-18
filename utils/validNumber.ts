import { PATTERN } from "./const";

/**
 * value가 숫자타입인지 체크 숫자가 아니라면 빈 문자열 반환
 * @param value
 * @returns
 */
const validNumber = (value: string | number) => {
  const bValue = PATTERN.NUMBER.test(value.toString());
  return bValue ? value : "";
};

export default validNumber;
