/**
 * 스타일 관련 함수 모음
 */

function stripUnit(value: string | number): number {
  const nValue = Number(value);
  return nValue / (nValue * 0 + 1);
}

function pixelToRem(value: string | number, base = 16) {
  return `${stripUnit(value) / base}rem`;
}
