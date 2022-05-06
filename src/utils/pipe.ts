// 연속된 함수 실행
type TFunc<TArgs = unknown, TReturn = unknown> = (...args: TArgs[]) => TReturn;
const pipe = (...fns: TFunc[]) => {
  return <T = unknown>(value: T) => {
    return fns.reduce((l, r) => r(l), value);
  };
};

export default pipe;
