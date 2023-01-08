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

/**
 *
 * @param color : hex컬러 코드
 * @param value : 조정 값
 * @returns
 */
function adjustHexColor(color: string, value = 0) {
  let nColor = color;
  const hasPrefix = nColor.indexOf('#') > -1;
  if (hasPrefix) {
    nColor = nColor.slice(1);
  }
  const num = parseInt(nColor, 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + value));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + value));
  const b = Math.max(0, Math.min(255, num & 0x0000ff));
  const result = ((r << 16) | (g << 8) | b).toString(16);
  return hasPrefix ? `#${result}` : result;
}

export {pickProps, adjustHexColor};
