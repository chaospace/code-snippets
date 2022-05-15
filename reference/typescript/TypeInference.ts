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

// Generic contrain
function fn<Char extends 'a'>(): Char {
  return 'a';
}

// 정의된 타입에 추가적인 속성을 추가에 타입체크를 속일 수는 있어도 타입 안정성은 보장할 수 없음.
const fna = fn<'a' & {readonly __tag: unique symbol}>().__tag;

// 인자가 object형식이라면 더욱 명확함.
function fnUser<User extends {name: string}>(): User {
  return {name: 'John', age: 42};
}

fnUser<{name: 'John'; surname: 'Doe'}>().surname; // unsafe
fnUser<{name: 'John'; surname: 'Doe'}>().age; // error

interface Person {
  firstName: string;
  lastName: string;
}

const userFoo = <User extends Person>(user: User) => {
  const user1: {[K in keyof User]?: number} = {firstName: 1};

  const user2: Partial<Record<keyof User, number>> = {firstName: 33}; // <----- error
};

type Human = {
  salary: number;
} & Person;

let human1: {[K in keyof Human]?: number} = {firstName: 1};
let human2: Partial<Record<keyof Human, number>> = {firstName: 2};
let human3: Partial<Record<keyof Person, number>> = {firstName: 33}; // <----- error

interface OptinalPerson {
  firstName?: string;
  lastName?: string;
}

type OptionalHuman = {
  salary?: number;
} & OptinalPerson &
  string; // <---- string

const OptionalHumanFoo = <User extends OptinalPerson>(user: User) => {
  const user1: {[K in keyof User]?: number} = {firstName: 1};

  const user2: Partial<Record<keyof User, number>> = {firstName: 2}; // <----- error
  console.log('user2', user2);
};

const fooHumanResult = OptionalHumanFoo<OptionalHuman>('a');

type ToStringHuman = Person & {
  toString: () => string;
};

let user2: Partial<Record<keyof ToStringHuman, number>>;
user2 = {firstName: 2}; // <----- error
