// 객체타입
type ObjType<T extends Object = any> = {[key: string]: T[keyof T]};

// 콜백함수 타입
type TFunc = (..._args: any) => any;
// 콜백함수의 리턴 타입 참조를 위한 타입
type InferReturn<T> = T extends (...rest: [...infer _Arg]) => infer Res ? Res : never;

// 특정 타입에 key정보를 옵셔널로 만들고 싶을 때 사용
type Optional<T, K extends keyof T> = Partial<T> & Omit<T, K>;
// 특정 타입에 key정보만 필수로 만들고 싶을 때 사용
type RequirePartial<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// 중첩 객체의 키를 모두 옵셔널로 사용
type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type {ObjType, DeepPartial, RequirePartial, Optional, InferReturn, TFunc};
