// 함수타입에 이름 추출
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type NoneFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

// 함수 추출
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
type NoneFunctionProperties<T> = Pick<T, NoneFunctionPropertyNames<T>>;

interface Part {
  id: number;
  name: string;
  subparts: Part[];
  updatePart(newName: string): void;
}

type T40Name = FunctionPropertyNames<Part>;
type T40 = FunctionProperties<Part>;
