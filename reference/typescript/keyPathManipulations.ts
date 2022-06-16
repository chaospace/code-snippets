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

// 타입을 이용한 object 키맵핑 처리
// 구현하고 싶은 기능 age키를 newAge로 변경
const mapKey = mapKeys({age: 1}, {age: 'newAge'});

// 키맵핑을 위한 mapKeys함수 및 기본타입선언
const mapKeys = <
  ObjKey extends PropertyKey,
  ObjValue extends PropertyKey,
  Obj extends Record<ObjKey, ObjValue>
>(
  obj: Obj
) => null as any;

// age키를 newAge로 변경
const useMapKey = mapKeys({age: 1});

const replaceMapKeys = <
  ObjKey extends PropertyKey,
  ObjValue extends PropertyKey,
  Obj extends Record<ObjKey, ObjValue>,
  NewKey extends PropertyKey,
  KeyMap extends Record<keyof Obj, NewKey>
>(
  obj: Obj,
  keyMap: KeyMap
) => null as any;

const changeKeyMap = replaceMapKeys({age: 1}, {age: 'newAge'});
console.log(changeKeyMap.newAge);

//
type Rename<Obj, Dictionary> = Dictionary extends Record<string, string>
  ? UnionToIntersection<
      Values<
        {
          [Prop in keyof Dictionary]: Prop extends keyof Obj
            ? Record<Dictionary[Prop], Obj[Prop]>
            : never;
        }
      >
    >
  : never;

const replaceMapKeys2 = <
  ObjKey extends PropertyKey,
  ObjValue extends PropertyKey,
  Obj extends Record<ObjKey, ObjValue>,
  NewKey extends PropertyKey,
  KeyMap extends Record<keyof Obj, NewKey>
>(
  obj: Obj,
  keyMap: KeyMap
): Rename<Obj, KeyMap> => null as any;
const changeKeyMap2 = replaceMapKeys2({age: 1}, {age: 'newAge'});
console.log(changeKeyMap2.newAge);

// 객체의 다양한 속성을 정확히 지정해 알고 싶다면?
const dictionary = {
  a: {
    foo: () => 'foo',
    bar: () => 42
  },
  b: {
    baz: () => 'baz'
  }
} as const;
// typeof 해당 객체 키의 타입을 반환
const TDA = typeof dictionary;
// 반환타입을 가지는 키를 반환
type DA = keyof typeof dictionary['a'];
const getFn = <Type extends keyof typeof dictionary>(
  type: Type,
  method: keyof typeof dictionary[Type]
) => dictionary[type];

// 동작에 무리는 없지만 정확한 리턴타입 추론은 안됨.
const dicAvalue = getFn('a', 'foo');
getFn('a', 'baz'); // expected error

//
const withConfig =
  (config: typeof dictionary) =>
  <Type extends keyof typeof dictionary>(type: Type, method: keyof typeof dictionary[Type]) =>
    config[type][method];
const applyConfig = withConfig(dictionary);
applyConfig('a', 'foo');
applyConfig('a', 'baz');

const withConfig2 =
  <Dictionary>(config: Dictionary) =>
  <Type extends keyof Dictionary, Method extends keyof Dictionary[Type]>(
    type: Type,
    method: Method
  ) =>
    config[type][method];
const applyConfig2 = withConfig2(dictionary);
applyConfig2('a', 'foo');
applyConfig2('a', 'baz');
// 여기까지는 함수가 없어서 복잡함 없이 생각처럼 풀린다

// 함수 추론
enum DataType {
  Image = 'Image',
  Text = 'Text'
}

interface TextInput {
  type: DataType.Text;
  text: string;
}

interface TextOutput {
  type: DataType.Text;
  text: string;
}

const TextTransformer = {
  transform: (input: TextInput): TextOutput => ({
    type: DataType.Text,
    text: input.text
  })
};

interface ImageInput {
  type: DataType.Image;
  url: string;
}

interface ImageOutput {
  type: DataType.Image;
  url: string;
  width: number;
  height: number;
}

const ImageTransformer = {
  transform: (input: ImageInput): ImageOutput => ({
    type: DataType.Image,
    url: input.url,
    width: 0,
    height: 0
  })
};

const transfomerMap = {
  [DataType.Text]: TextTransformer,
  [DataType.Image]: ImageTransformer
};

type Input = TextInput | ImageInput;
type Output = TextOutput | ImageOutput;

// 유니온타입을 이용하게 되면 ts는 never를 기대하며 인자를 이용하는 transform에서 에러를 발생
const magic = (inputs: Input[]): Output[] => {
  return inputs.map(input => transfomerMap[input.type].transform(input.type));
};

// curry를 이용한 타입
const curryMagic =
  <
    Key extends typeof DataType,
    Value extends {transform: (args: Input) => Output},
    TransformMap extends Record<Key & string, Value>
  >(
    transformers: TransformMap
  ) =>
  (inputs: Input[]): Output[] => {
    return inputs.map(input => transformers[input.type].transform(input));
  };

const curryMagicMap = curryMagic({
  [DataType.Image]: ImageTransformer,
  [DataType.Text]: TextTransformer
});
