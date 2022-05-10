const foo = <T>(a: T) => a;
// const foo:<42>(a:42) => 42;
foo(42);

// const foo:<{a:number}>(a:{a:number}) => {a:number};
foo({a: 42});

// object타입 추론이 아닌 리터럴 추론을 하고 싶다면?
foo({a: 42} as const);

// object타입 혹은 리터럴 추론을 옵셔널 하게 하고 싶다면?
const upgradeFoo = <TValue, T extends {a: TValue}>(a: T) => a;
// upgradeFoo<unknown, {a:number}>(a:{a:number}) => {a:number};
upgradeFoo({a: 42});

const upgradeFoo2 = <TValue extends number, T extends {a: TValue}>(a: T) => a;
// upgradeFoo<number, {a:42}>(a:{a:42}) => {a:42};
upgradeFoo2({a: 42});

const InferencedFoo = <
  Key extends PropertyKey,
  Value extends number | string,
  T extends Record<Key, Value>
>(
  a: T
) => a;

InferencedFoo({a: 42, b: 'hello'});

// Value타입에 유형을 다양하게 하도록 Json유형 추가
type Json =
  | null
  | string
  | number
  | boolean
  | Array<JSON>
  | {
      [prop: string]: Json;
    };
const InferencedFooExtends = <
  Key extends PropertyKey,
  Value extends Json,
  T extends Record<Key, Value>[]
>(
  a: T
) => a;

InferencedFooExtends([{a: 42, b: 'hello'}]);
