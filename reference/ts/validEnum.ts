enum MyEnum {
  ONE,
  TWO
}

const hanleEnum = (value: MyEnum) => value;
//enum타입을 받아야 하지만 타입체크가 제대로 동작안함.
hanleEnum(Infinity);
hanleEnum(0.0000001);
hanleEnum(NaN);

// Enum은 아래와 같이 컴파일 됨.
/**
 {
    "0": "ONE",
    "1": "TWO",
    "ONE": 0,
    "TWO": 1
}
 */

type Keys = keyof typeof MyEnum;
// type Enumerate2 = keyof {
//   [Prop in Keys]: Prop;
// };

// 템플릿 문자열을 이용하면 0, 1을 가진 타입 추출
type AA = {[Prop in `${MyEnum}`]: Prop};
type Enumerate<Enum extends number | string> = keyof {
  [Prop in `${Enum}`]: Prop;
};

type R = Enumerate<MyEnum>;
type Values<T> = T[keyof T];
type IsKeyValid<
  InitialValue extends number,
  Enum extends Record<string | number, string | number>
> = `${InitialValue}` extends Enumerate<Values<Enum>> ? InitialValue : never;
type Test1 = IsKeyValid<1, typeof MyEnum>;
type Test42 = IsKeyValid<42, typeof MyEnum>;
type Test_1 = IsKeyValid<-1, typeof MyEnum>;

const validHandleEnum = <
  Enum extends Record<string | number, string | number>,
  InitialValue extends number
>(
  anEnum: Enum,
  initialState: IsKeyValid<InitialValue, Enum>
) => {};

validHandleEnum(MyEnum, MyEnum.ONE);
validHandleEnum(MyEnum, 1);
validHandleEnum(MyEnum, -1); // error
validHandleEnum(MyEnum, Infinity); // error

type EnumType = Record<string | number, string | number>;
type EnumToObj<Enum extends EnumType> = Pick<
  {
    [Prop in keyof Enum]: Enum[Prop] extends string | number ? `${Enum[Prop]}` : never;
  },
  keyof Enum
>;

type EnumObjResult = EnumToObj<typeof MyEnum>;

type GetEnumValue<
  Enum extends EnumType,
  Index extends number,
  Obj extends EnumToObj<Enum> = EnumToObj<Enum>
> = {
  [Prop in keyof Obj]: `${Index}` extends Obj[Prop] ? Prop : never;
}[keyof Enum];

type TestGetEnumValue = GetEnumValue<typeof MyEnum, MyEnum.TWO>;
