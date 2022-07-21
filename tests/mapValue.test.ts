import Maybe from '@/monad/maybe';
import {TFunc} from '@/types/types';
import nop from '@/utils/nop';

/**
 * 단순 get map처리보다
 * null or undefined 같은 부정한 값이 와도 중닩없이 동작해야 함.
 * MapValue안에서 값의 유효성을 판단 후 return 해야 함.
 */
interface MapValue<T> {
  value(): T;
  map<TFunc extends (arg: T) => any>(transformFunc: TFunc): MapValue<ReturnType<TFunc>>;
}

// // maybe팩토리 인터페이스
interface MaybeAble<T> {
  create(input: T): MaybeAble<T>;
  value(): T;
  map<TFunc extends (arg: T) => any>(transformFunc: TFunc): MaybeAble<ReturnType<TFunc>>;
}

const mapValue = <T>(input: T): MapValue<T> => ({
  value: () => input,
  map: transformFunc => {
    return mapValue(transformFunc(input));
  }
});

/**
 * class가 아닌 함수로 만들 경우 내부 함수에서 조건을 판단하기 위한 함수가 필요할 때 난감.
 * static으로 구성된 객체 혹은 객체로 깜싸놓을 필요가 있을 거 같음.
 * @param input
 * @returns
 */
const errorMaybe = <T>(input: T): MaybeAble<T> => ({
  value: () => input,
  create: (input: T) => errorMaybe(input),
  map: transformFunc => {
    return input ? errorMaybe(transformFunc(input)) : errorMaybe(undefined);
  }
});

describe('monad를 이용한 value관리 테스트', () => {
  it('value값이 유효하지 않아도 error없이 관리 할 수 있어야 한다.', () => {
    const value = 10;
    const strValue = mapValue(value).map((v: number) => (v * 2).toString());
    console.log(strValue);
    expect(strValue.value()).toEqual('20');
  });

  it('errorMaybe 동작 테스트', () => {
    const e = errorMaybe(30)
      .map(n => undefined)
      .map(v => v);
    console.log('e', e.value());
  });
});
