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

type Values<T> = T[keyof T];

type Iterate<Obj, Path extends any[] = []> = Obj extends string // <----------- added condition
  ? Record<Obj, Path> // <---------- added condition branch
  : {
      /**
       * Iterate recursively through each key/value pair
       */
      [Prop in keyof Obj]: /**
       * If iteration hit the bottom call
       * Iterate recursively but without adding current Prop to
       * Path tuple
       */ Obj[Prop] extends string
        ? Iterate<Obj[Prop], Path>
        : /**
           * If Obj[Prop] is a nested object, call
           * Iterate recursively with adding Prop to
           * Path tuple
           */
          Iterate<Obj[Prop], [...Path, Prop]>;
    }[keyof Obj];

type IterateValues<Obj, Path extends any[] = []> = Obj extends string // <----------- added condition
  ? Record<Obj, Path> // <---------- added condition branch
  : Values<
      {
        [Prop in keyof Obj]: Obj[Prop] extends string
          ? Iterate<Obj[Prop], Path>
          : Iterate<Obj[Prop], [...Path, Prop]>;
      }
    >;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

type Result = Iterate<Data>;
type UnionResult = UnionToIntersection<Result>;
