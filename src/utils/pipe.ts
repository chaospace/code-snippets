import isArray from './isArray';
import toArray from './toArray';

// 연속된 함수 실행
type TFunc = (...args: any[]) => any;
//type TArgs<T> = T extends (...args: infer A) => any ? A : never;
//type TReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
// type Callback<T extends (args: any[]) => any, Args extends unknown[]> = T extends (
//   ...args: Args
// ) => infer Res
//   ? Res
//   : never;

const pipe = <T extends TFunc, U extends TFunc[], R extends TFunc>(...fns: [T, ...U, R]) => {
  return (...args: Parameters<T>): ReturnType<R> => {
    return fns.reduce((value, func) => {
      const v = toArray(value);
      return func(...v);
    }, args);
  };
};

export default pipe;
