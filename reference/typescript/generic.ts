import {ArrayKeys} from '@babel/traverse';

function identity<Type>(arg: Type): Type {
  return arg;
}

function strIdentity(arg: string) {
  return arg;
}

interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

interface GenericIdentityFnWithGeneric<Type> {
  (arg: Type): Type;
}

// object를 이용한 타입선언
let myIdentityObj: {<Type>(arg: Type): Type} = identity;
// interface를 이용한 대체
let myIdentity: GenericIdentityFn = identity;

// interface에 generic을 이용한 대체
// identity에서 사용하는 타입을 선언적으로 변경가능
let myIdentityGeneric: GenericIdentityFnWithGeneric<string> = identity;

/**
 *  제네릭 제약조건에서 유형 매개변수 사용
 *  Key: Type형식이 가진 key중 하나를 나타냄.
 */
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

const objFoo = {a: 1, b: 2, c: 3};
getProperty(objFoo, 'a');
// objFoo에 없는 속성을 사용해 에러를 알려줌.
getProperty(objFoo, 'd');

/**
 * 제네릭을 이용한 생성자
 */
function create<Type>(c: {new (): Type}): Type {
  return new c();
}

/**
 * keyof 타입 연산자
 */
type Point = {x: number; y: number};
type PointPropertyKey = keyof Point;

type Arraryish = {[n: number]: unknown};
type AarrayKey = keyof Arraryish;

type Mapish = {[k: string]: boolean};
// 자바스크립트는 객체의 키에 기본값을 문자열을 이용하기 때문에 M은 number|string 타입을 가짐
type MapKey = keyof Mapish;
const mapKey: MapKey = '0';

/**
 * typeof 타입 연산자
 *
 * 기본형을 구분하기 위한 방식은 유용하지 못하다 생각할 수 있지만
 * 다른 타입과 같이 사용하면 유효성을 느낄 수 있음.
 */
console.log(typeof 'hello world');
function f() {
  return {x: 10, y: 3};
}
type FunReturnType = ReturnType<typeof f>;

/**
 * Indexed Access 타입
 */
type Person = {age: number; name: string; alive: boolean};
type Age = Person['age'];

type N1 = Person['age' | 'alive'];
type PersonKey = Person[keyof Person];

// 배열의 특정 인덱스 타입 접근
const myArray = [
  {
    name: 'alice',
    age: 10
  },
  {
    name: 'bob',
    age: 20
  },
  {
    name: 'eve',
    age: 40
  }
];
// number를 통해 배열에 있는 타입에 추출 가능
type First = typeof myArray[number];

/**
 * 조건부 타입
 *
 * SomeType extends OtherType ? TrueType : FlaseType;
 */
interface IdLabel {
  id: number;
}

interface NameLabel {
  name: string;
}
// override를 통한 다양한 형식을 선언하는 방법보다
interface ICreateLabel {
  createLabel(id: number): IdLabel;
  createLabel(name: string): NameLabel;
  createLabel(nameOrId: string | number): IdLabel | NameLabel;
  createLabel(nameOrId: string | number): IdLabel | NameLabel | never;
}

// 조건부 타입을 이용하는게 깔끔하다.
type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;
function conditionalCreateLabel<T extends string | number>(value: T): NameOrId<T> {
  throw 'unimplemented';
}

const nId = conditionalCreateLabel(9);
const strName = conditionalCreateLabel('typescript');
const random = conditionalCreateLabel(Math.random() > 0.4 ? 20 : 'rand');

/**
 * 조건부 타입 제한
 */
type MessageOf<T> = T['messaage']; // 타입에 message속성을 알수 없음

// 타입에 message속성을 강제해서 주어진 타입에 message속성 타입을 추출
type MessageOfType<T extends {message: unknown}> = T['message'];

interface Email {
  message: string;
}

type EmailMessageContents = MessageOfType<Email>;

// 조건부 타입을 이용해 message속성이 존재하면 타입을 추출하고 아니면 never를 반환
type ConditionalMessageOf<T> = T extends {message: unknown} ? T['message'] : never;

interface Dog {
  bark(): void;
}

type DogMessage = ConditionalMessageOf<Dog>;
type EmailMessage = ConditionalMessageOf<Email>;

// 배열 타입이 오면 indexed access타입 처리 아니면 그냥 반환
type Flatten<T> = T extends any[] ? T[number] : T;
type Str = Flatten<string[]>;
type Num = Flatten<number>;

/**
 * inferring을 이용한 조건부 타입
 * 위에 Flattern에 inferr를 적용
 */
type InterFlattern<Type> = Type extends Array<infer Item> ? Item : Type;
type InterNum = InterFlattern<number[]>;

type GetReturnType<Type> = Type extends (...args: never[]) => infer Return ? Return : never;

type Bools = GetReturnType<() => boolean>;

/**
 * 분배 조건부 타입
 */
type ToArray<Type> = Type extends any ? Type[] : never;
type StrOrNumArray = ToArray<string | number>;

type ToArrayNoneDist<Type> = [Type] extends [any] ? Type[] : never;
type NoneStrOrNumArray = ToArrayNoneDist<string | number>;

/**
 * 맵핑 타입
 */
type Horses = {age: number};
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horses;
};

const conforms: OnlyBoolsAndHorses = {
  del: false,
  rodney: true,
  name: 'aaa'
};

/**
 * 맵핑 수정자
 * 맵핑 타입 선언 시 +-를 이용해 ?(옵셔널) readOnly(읽기전용) 속성 변경을 가할 수 있음.
 */
// 제공되는 타입에 속성에서 readonly속성을 제거한 타입 선언
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type ImmutableAccout = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<ImmutableAccout>;

type NoneOptionalType<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type OptionalUser = {
  id: string;
  name?: string;
  job?: string;
};

type PrimaryUser = NoneOptionalType<OptionalUser>;

/**
 *  as를 사용한 키 맵핑
 * type MappedTypeWithNewProperties<Type> = {
    [Properties in keyof Type as NewKeyType] : Type[Properties];
   }
 */

// as를 이용해 새로운 타입 맵핑을 적용
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property];
};
type UserGetters = Getters<PrimaryUser>;

type RemoveKindKey<Type> = {
  [Property in keyof Type as Exclude<Property, 'kind'>]: Type[Property];
};

interface Circle {
  kind: 'circle';
  radius: number;
  width: string;
  height: string | boolean;
}

type NoneKindCircle = RemoveKindKey<Circle>;

const setCircle = (key: keyof NoneKindCircle, value: NoneKindCircle[keyof NoneKindCircle]) => {
  let obj: NoneKindCircle = {
    radius: 1,
    width: '1',
    height: false
  };
  obj[key] = value;
};
/**
 *  키 맵핑은 기본형이 아닌 커스텀 타입도 가능
 */

type EventConfig<Events extends {kind: string}> = {
  [E in Events as E['kind']]: (event: E) => void;
};

type SquareEvent = {kind: 'square'; x: number; y: number};
type CircleEvent = {kind: 'circle'; radius: number};

type Config = EventConfig<SquareEvent | CircleEvent>;

/**
 * 키 맵핑과 조건부 타입
 * 속성에 특정정보 ( pii 값)여부로 true : false를 설정
 */
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends {pii: true} ? true : false;
};

type DBFields = {
  id: {format: 'incremeting'};
  name: {type: string; pii: true};
};

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
