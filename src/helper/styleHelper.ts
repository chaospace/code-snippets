/**
 * 스타일 관련 함수 모음
 */

import hasProperty from '@/utils/hasProperty';

function stripUnit(value: string | number): number {
  const nValue = Number(value);
  return nValue / (nValue * 0 + 1);
}

function pixelToRem(value: string | number, base = 16) {
  return `${stripUnit(value) / base}rem`;
}

function pickProps<T, K extends keyof T>(style: T, keys: K[]) {
  const results = {};
  for (const key of keys) {
    if (hasProperty(style, key)) {
      results[key.toString()] = style[key];
    }
  }
  return results;
}

export {pickProps};
