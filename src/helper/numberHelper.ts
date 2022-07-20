import {TFunc} from '@/types/types';
import {Formatter} from '../utils/const';
import nop from '../utils/nop';
import toNumber from '../utils/toNumber';

function isConvertUnit(unit: string) {
  return unit === Formatter.GENERATION_UNIT || unit === Formatter.CAPACITY_UNIT;
}

// number형이 아닌 값 mark로 replace 처리
function replaceNaNValue<T = any>(value: T, mark = '-') {
  return typeof toNumber(value) !== 'number' ? mark : value;
}

/**
 * value에 단위 변환 처리
 * @param value
 * @param unit
 * @returns
 */
function convertUnit<T = any>(value: T, unit = 1000) {
  const nValue = toNumber(value);
  return nValue === nop ? value : nValue / unit;
}

/**
 * 천단위 콤마 적용
 * @param str
 * @returns
 */
function intComma<T = any>(str: T) {
  const nValue = toNumber(str);
  if (nValue === nop) return str;
  let value = nValue.toString();
  const reg = /(^[+-]?\d+)(\d{3})/;
  while (reg.test(value)) {
    value = value.replace(reg, '$1,$2');
  }
  return value;
}

/**
 * value에 소수점이 precision 이상일 경우 제거
 * @param value 소수점 적용 대상
 * @param precision 허용 소수점 자릴 수 기본값 2
 * @returns
 */
function smartFixed<T = any>(value: T, precision = 2) {
  const nValue = toNumber(value);
  if (nValue !== nop) {
    return parseFloat(nValue.toFixed(precision));
  }
  return value;
}

/**
 * 함수형을 이용한 변환처리
 * @param value    : filter적용 대상
 * @param filters  : 적용 함수 배열
 * @returns
 */
function convert<T = any>(value: T, filters: TFunc[]) {
  return filters.reduce((l, r) => r(l), value);
}

/**
 * 대상 value에 콤마처리와 소수점 2자리를 적용해 리턴
 * suffix이 발전량, 발전용량에 해당하면 1000으로 나눠주는 함수를 추가로 적용
 * @param value  변환대상 값
 * @param suffix vlaue에 단위
 * @returns
 */
function numberFormatterWithSuffix<T = any>(value: T, suffix = '') {
  const r = replaceNaNValue(value);
  if (r !== Formatter.NULL_REPLACE_VALUE) {
    if (suffix && isConvertUnit(suffix)) {
      return convert(value, [convertUnit, smartFixed, intComma]);
    }
    return convert(value, [smartFixed, intComma]);
  }
  return r;
}

/**
 * 대상 value 포맷 변경 후 추가 suffix텍스트를 붙여서 반환
 * @param value
 * @param suffix
 * @returns
 */
function numberFormatterAppendSuffix<T = any>(value: T, suffix = '') {
  const r = numberFormatterWithSuffix(value, suffix);
  return `${r} ${suffix}`;
}

export {numberFormatterAppendSuffix, numberFormatterWithSuffix, convert};
