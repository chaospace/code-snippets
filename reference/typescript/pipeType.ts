type Fn = (a: any) => any;
type Head<T extends any[]> = T extends [infer H, ...infer _] ? H : never;
type Last<T extends any[]> = T extends [infer _]
  ? never
  : T extends [...infer _, infer TL]
  ? TL
  : never;

type Allowed<T extends Fn[], Cache extends Fn[] = []> = T extends []
  ? Cache
  : T extends [infer Lst]
  ? Lst extends Fn
    ? Allowed<[], [...Cache, Lst]>
    : never
  : T extends [infer Fst, ...infer Lst]
  ? Fst extends Fn
    ? Lst extends Fn[]
      ? Head<Lst> extends Fn
        ? Head<Parameters<Fst>> extends ReturnType<Head<Lst>>
          ? Allowed<Lst, [...Cache, Fst]>
          : never
        : never
      : never
    : never
  : never;

type LastParameterOf<T extends Fn[]> = Last<T> extends Fn ? Head<Parameters<Last<T>>> : never;

type Return<T extends Fn[]> = Head<T> extends Fn ? ReturnType<Head<T>> : never;

function compose<
  T extends Fn,
  Fns extends T[],
  Allow extends {
    0: [never];
    1: [LastParameterOf<Fns>];
  }[Allowed<Fns> extends never ? 0 : 1]
>(...args: [...Fns]): (...data: Allow) => Return<Fns>;

function compose<T extends Fn, Fns extends T[], Allow extends unknown[]>(...args: [...Fns]) {
  return (...data: Allow) => args.reduceRight((acc, elem) => elem(acc), data);
}

const foo = (arg: 1 | 2) => [1, 2, 3];
const bar = (arg: string) => (arg.length > 10 ? 1 : 2);
const baz = (arg: number[]) => 'hello';

const r = compose(foo, bar, baz)([1, 2, 3]);
