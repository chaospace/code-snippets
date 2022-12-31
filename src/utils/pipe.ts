import toArray from './toArray';

// 연속된 함수 실행
type TFunc = (...args: any[]) => any;

const pipe = <T extends TFunc, U extends TFunc[], R extends TFunc>(...fns: [T, ...U, R]) => {
  return (...args: Parameters<T>): ReturnType<R> => {
    return fns.reduce((value, func) => func(...toArray(value)), args);
  };
};

export default pipe;
