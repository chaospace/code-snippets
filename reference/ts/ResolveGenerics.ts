// 팩토리 함수를 제공하다고 가정
/**
 factory(
  {
    a: function () {
      this.id;
      const b = this.b();
      return '0';
    },
    b: function () {
      const b = this.b();
      this.c();
      return '0';
    }
  },
  function () {
    this.id;
    const a = this.a();
    const b = this.b();
  }
);
 */
//import { createFactory } from 'react';

import {METHOD_TYPES} from '@babel/types';
import {useCallback} from 'react';

// 공통된 id를 제공하기 위한 기본타입 선언
type Base = {id: string};
const factory = <T extends Base, Methods extends Record<string, (this: T) => unknown>>(
  methods: Methods,
  method: (this: T) => void
) => {
  return null as any;
};

factory(
  {
    a: function () {
      this.id;
      const b = this.b();
      return '0';
    },
    b: function () {
      const b = this.b();
      this.c();
      return '0';
    }
  },
  function () {
    this.id;
    const a = this.a();
    const b = this.b();
  }
);

/**

methods내부에서 this를 통해 메서드 접근해야 되고 
이는 앞에 선언된 method에 인수 this에 타입에 & Methods를 추가한다.
*/
const factoryUpgrade = <
  T extends Base,
  Methods extends Record<string, (this: T & Methods) => unknown>
>(
  methods: Methods,
  method: (this: T & Methods) => void
) => {
  return null as any;
};

// method에 타입은 해결됐지만 methods내부에 this는 해결안됨.
// 이유는?
//
factoryUpgrade(
  {
    a: function () {
      this.id;
      const b = this.b();
      return '0';
    },
    b: function () {
      const b = this.b();
      this.c();
      return '0';
    }
  },
  function () {
    this.id;
    const a = this.a();
    const b = this.b();
  }
);

const factoryUpgradeSelf = <
  T extends Base,
  Methods extends Record<string, <Self extends Methods>(this: T & Self) => unknown>
>(
  methods: Methods,
  method: (this: T & Methods) => void
) => {
  return null as any;
};

factoryUpgradeSelf(
  {
    a: function () {
      this.id;
      const b = this.b();
      return '0';
    },
    b: function () {
      const b = this.b();
      this.c();
      return '0';
    }
  },
  function () {
    this.id;
    const a = this.a();
    const b = this.b();
  }
);

// Typing Curried factories
// 콜백을 이용한 함수 curry이용시 타입 적용 샘플
const hof = (callback, data) => model => callback({...data, ...model});
// Arg, KnownProps 타입을 통해 반환되는 함수에서 받을 수 있는 파라미터 타입을 지정할 수 있음
const TypedHof =
  <
    Callback extends (arg: any) => void,
    Arg extends Parameters<Callback>[0],
    KnownProps extends Partial<Arg>
  >(
    callback: Callback,
    knownProps: KnownProps
  ) =>
  (newProps: Omit<Arg, keyof KnownProps>) =>
    callback({
      ...knownProps,
      ...newProps
    });

interface GreeterData {
  greetings: string;
  userName: string;
}

const greeter = (greeterData: GreeterData) => String;
const greet1 = TypedHof(greeter, {greetings: 'hello'});
greet1({userName: 'ch'});
greet1({userName: 'ch', greetings: 'dddd'});
