// pipe 테스트

import pipe from '@/utils/pipe';
function add10(value: number) {
  return value + 10;
}

function add5(value: number) {
  return value + 5;
}

//#Array.prototype.includes
type Primitives = string | number | boolean | symbol | null | undefined;
type InferPrimitive<T, P> = P extends any ? (T extends P ? P : never) : never;
type Inference<T> = InferPrimitive<T, Primitives>;

const PROPS = ['a', 'b', 'c'] as const;

// 리턴 타입 유효성은 is를 통해 체크 후 & 연산을 통해 할 수 있음.
const withTuple =
  <List extends Primitives[]>(list: readonly [...List]) =>
  (prop: Inference<List[number]>): prop is Inference<List[number]> & List[number] =>
    list.includes(prop);

const includes = withTuple(PROPS);

//#Inference with curry
type ThingProps<T, R> = {
  something: T;
  callback: (arg: T) => R;
};

const fn =
  <T, R>(props: ThingProps<T, R>) =>
  (children: (result: R) => void) => ({...props, children});

const withChildren = fn({
  something: 1,
  callback: arg => arg.toString()
});

const result = withChildren((result /** string */) => {});

// #Builder utility
const buildFn = <
  Property extends string,
  Item extends {property: Property; handler: (prop: Property) => void},
  Tuple extends Item[]
>(
  tuple: [...Tuple]
) => tuple;

buildFn([
  {
    property: 'hello',
    handler: (prop /** string */) => {}
  }
]);

type BuildItem<P> = {
  property: P;
  handler: (prop: P) => void;
};

const BuildFunc = <Property extends string>(tuple: BuildItem<Property>[]) => tuple;
BuildFunc([
  {
    property: 'hello',
    handler: (prop /** hello | bye */) => {}
  },
  {
    property: 'bye',
    handler: (prop /** hello | bye */) => {}
  }
]);

type Data = {
  k2: {
    k2A: {
      k2A1: 'k2A1_E';
      k2A2: 'k2A2_F';
    };
    k2B: {
      k2B1: 'k2B1_G';
      k2B2: 'k2B2_H';
    };
  };
};

type Iterate<Obj, Path extends any[] = []> = Obj extends string // <----------- added condition
  ? Record<Obj, Path> // <---------- added condition branch
  : {
      /**
       * Iterate recursively through each key/value pair
       */
      [Prop in keyof Obj
      /**
       * If iteration hit the bottom call
       * Iterate recursively but without adding current Prop to
       * Path tuple
       */]: Obj[Prop] extends string
        ? Iterate<Obj[Prop], Path>
        : /**
           * If Obj[Prop] is a nested object, call
           * Iterate recursively with adding Prop to
           * Path tuple
           */
          Iterate<Obj[Prop], [...Path, Prop]>;
    }[keyof Obj];

type Result = Iterate<Data>;

declare function f<T extends boolean>(x: T): T extends true ? string : number;

// 타입은 'string | number'
let x = f(Math.random() < 0.5);

type TypeName<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolen'
  : T extends Function
  ? 'function'
  : object;

type TString = TypeName<string>;
type TFunc = TypeName<() => void>;
type TBoolean = TypeName<true>;

describe('pipe테스트', () => {
  it('4에서 연속된 함수(add10, add5)를 통한 결과 19를 받을 수 있다', () => {
    const sum = pipe(add10, add5);
    const result = sum(4);
    expect(result).toEqual(19);
  });
});
