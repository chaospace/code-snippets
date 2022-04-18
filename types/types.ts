export type TFunc = (..._args: any) => any;
export type InferReturn<T> = T extends (...rest: [...infer _Arg]) => infer Res
  ? Res
  : never;

// 특정 타입에 key정보를 옵셔널로 만들고 싶을 때 사용
export type Optional<T, K extends keyof T> = Partial<T> & Omit<T, K>;
// 특정 타입에 key정보만 필수로 만들고 싶을 때 사용
export type RequirePartial<T, K extends keyof T> = Partial<T> & Pick<T, K>;
