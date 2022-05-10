# 함수 인자 타입 추론

## Basic of argument inference

```typescript
const foo = <T>(a: T) => a;
// const foo:<42>(a:42) => 42;
foo(42);
```

**오브젝트를 넘긴 경우**

```typescript
const foo = <T>(a: T) => a;
// const foo:<{a:number}>(a:{a:number}) => {a:number};
foo({a: 42});
```

**오브젝트 형식 추론을 리터럴값으로 추론하고 싶다면**

```typescript
const foo = <T>(a: T) => a;
// const foo:<{a:42}>(a:{a:42}) => {a:42};
foo({a: 42} as const);
```

**제레릭을 이용한 추론**

```typescript
const foo = <Value, T extends {a:Value}>(a: T) => a;
const foo:<unknown, {a:number}>(a:{a:number}) => {a:number};
foo({a: 42});
```

**제레릭 타입제한을 통한 리터럴 추론**

```typescript
const foo = <Value extends number, T extends {a:Value}>(a: T) => a;
const foo:<number, {a:42}>(a:{a:42}) => {a:42};
foo({a: 42});
```

**제레릭을 이용한 객체 타입 추론**

```typescript
const foo = <Key extends PropertyKey, Value extends number | string, T extends Record<Key, Value>>(
  a: T
) => a;

foo({a: 42, b: 'hello'});
```
