# 조건부 타입

**조건부 유형은 조건에 따라 두 가지 유형 중 하나로 <code>결정</code>되거나, <code>지연</code>됩니다.**

> T extends U ? X : Y

**조건부 타입 기본 예제**

```typescript
declare function f<T extends boolean>(x: T): T extends true ? string : number;

// 타입은 'string | number'
let x = f(Math.random() < 0.5);
```

**중첩 조건을 사용하는 예제**

```typescript
type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolen" :
    T extends Function ? "function" :
    object;

type TString = TypeName<string>;
type TFunc = TypeName<()=>void)>;
type TBoolean = TypeName<true>;
```

**분배 조건부 유형 예제**

```typescript
type T10 = TypeName<string | (() => void)>; // "string" | "function"
type T12 = TypeName<string | string[] | undefined>; // "string" | "object" | "undefined"
type T11 = TypeName<string[] | number[]>; // "object"
```

**조건부 타입을 이용한 유니언 타입 필터링 예제**

```typescript
type Diff<T, U> = T extends U ? never : T; // U에 할당할 수 있는 타입을 T에서 제거
type Filter<T, U> = T extends U ? T : never; // U에 할당할 수 없는 타입을 T에서 제거

type T30 = Diff<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>; // "b" | "d"
type T31 = Filter<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>; // "a" | "c"
type T32 = Diff<string | number | (() => void), Function>; // string | number
type T33 = Filter<string | number | (() => void), Function>; // () => void

type NonNullable<T> = Diff<T, null | undefined>; // T에서 null과 undefined를 제거

type T34 = NonNullable<string | number | undefined>; // string | number
type T35 = NonNullable<string | string[] | null | undefined>; // string | string[]

function f1<T>(x: T, y: NonNullable<T>) {
  x = y; // 성공
  y = x; // 오류
}

function f2<T extends string | undefined>(x: T, y: NonNullable<T>) {
  x = y; // 성공
  y = x; // 오류
  let s1: string = x; // 오류
  let s2: string = y; // 성공
}
```

**조건부 타입을 이용한 Primitive 타입 예제**

```typescript
type Primitives = string | number | boolean | symbol | null | undefined;
type InferPrimitive<T, P> = P extends any ? (T extends P ? P : never) : never;
type Inference<T> = InferPrimitive<T, Primitives>;

type _ = Inference<2 | 's'>; // number | string;
type __ = Inference<211>; // number;
```

# 조건부 타입은 매핑된 유형과 결합될 때 특히 유용

```typescript
// 함수타입에 이름 추출
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

// 함수를 제외한 속성 이름 추출
type NoneFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

// Pick을 통한 속성 및 함수 추출
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
```
