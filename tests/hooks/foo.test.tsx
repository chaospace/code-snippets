import {render} from '@testing-library/react';
import React from 'react';

/*

let state: any[] = [];
let setters: any[] = [];
let firstRun = true;
let cursor = 0;

function createSetter(cursor: number) {
  return function setterWithCursor(newVal: any) {
    state[cursor] = newVal;
  };
}

// This is the pseudocode for the useState helper
function useState(initVal: any) {
  if (firstRun) {
    state.push(initVal);
    setters.push(createSetter(cursor));
    firstRun = false;
  }

  const setter = setters[cursor];
  const value = state[cursor];

  cursor++;
  return [value, setter];
}

// Our component code that uses hooks
function RenderFunctionComponent() {
  const [firstName, setFirstName] = useState('Rudi'); // cursor: 0
  const [lastName, setLastName] = useState('Yardley'); // cursor: 1
  console.log('re-', state);
  return (
    <div>
      <button onClick={() => setFirstName('Richard')}>Richard</button>
      <button onClick={() => setFirstName('Fred')}>Fred</button>
    </div>
  );
}

// This is sort of simulating Reacts rendering cycle
function MyComponent() {
  cursor = 0; // resetting the cursor
  return <RenderFunctionComponent />; // render
}

describe('훅 동작', () => {
  it('기본', () => {
    console.log(state); // Pre-render: []
    RenderFunctionComponent();
    console.log(state); // First-render: ['Rudi', 'Yardley']
    //RenderFunctionComponent();
    //console.log(state); // Subsequent-render: ['Rudi', 'Yardley']
  });
});

*/

type CloseState = Function | Object;

const MyCloserFactory = (() => {
  console.log('aaa');
  let refCount = 0;
  const states: any[] = [];
  const setters: Function[] = [];
  const hooks = [];
  const listeners: Function[] = [];

  const isFunc = (value: unknown): value is Function => {
    return typeof value === 'function';
  };

  const createSetter = <T extends unknown>(cursor: number) => {
    return (newValue: T) => {
      const prev = states[cursor];
      const next = (isFunc(newValue) && newValue(prev)) || newValue;
      if (!Object.is(prev, next)) {
        states[cursor] = next;
        notify();
      }
    };
  };

  // 지연호출을 위한 처리
  const nextTick = (callback: Function) => {
    //console.log('next-tick', callback);
    setTimeout(callback, 1);
  };

  const notify = () => {
    refCount = 0;
    console.log('change-notify');
    for (let l of listeners) {
      l();
    }
  };

  return {
    subscription(l: Function) {
      listeners.push(l);
      let idx = listeners.length - 1;
      return () => {
        listeners.splice(idx, 1);
      };
    },
    useState<T extends unknown>(initialState: T) {
      const count = refCount++;
      states[count] = states[count] || (isFunc(initialState) && initialState()) || initialState;
      const setter = createSetter<T>(count);
      return [states[count], setter] as [T, (value: T) => void];
    },

    useEffect(callback: Function, deps: any[] = []) {
      const effectCount = refCount++;
      states[effectCount] = states[effectCount] || {_init: false, _deps: deps};
      const {_init, _deps} = states[effectCount];
      const noDeps = _deps.length === 0;
      const changeDeps = _deps.some((v: any, idx: number) => !Object.is(deps[idx], v));
      if (!_init && noDeps) {
        states[effectCount]._init = true;
        nextTick(callback);
      } else if (changeDeps) {
        states[effectCount]._deps = deps;
        console.log('ref-change');
        nextTick(callback);
      }
    }
  };
})();

//console.log(MyCloserFactory.getName());
describe('클로저 테스트', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runAllTimers();
  });
  const TempComp = () => {
    const [name, setName] = MyCloserFactory.useState('my-name');
    const udpateName = () => {
      setName('chaospace');
    };
    console.log('comp---', name);

    MyCloserFactory.useEffect(() => {
      console.log('mounted-');
    });
    return {
      udpateName
    };
  };

  MyCloserFactory.subscription(TempComp);

  let comp = TempComp();
  it('기본구성', () => {
    comp.udpateName();
  });
});
