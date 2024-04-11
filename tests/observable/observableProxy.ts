/**
 * proxy를 이용한 observable처리
 */

const INITIAL_STATE = {
  todos: [],
  currentFilter: 'all'
};

type State = typeof INITIAL_STATE;

const deepClone = (state: State) => JSON.parse(JSON.stringify(state));
const freeze = (state: State) => Object.freeze(deepClone(state));
export default (state = INITIAL_STATE) => {
  let listeners: Function[] = [];
  const invokeSubscribers = (data: State) => {
    for (const l of listeners) {
      l(freeze(data));
    }
  };

  const proxy = new Proxy(deepClone(state), {
    set(target: State, property: keyof State, newValue: any) {
      const isChanged = !Object.is(target[property], newValue);
      const results = Reflect.set(target, property, newValue);
      if (isChanged) {
        invokeSubscribers(proxy);
      }
      return results;
    }
  });

  proxy.addChangeListener = (listener: Function) => {
    if (listeners.indexOf(listener) == -1) {
      listeners.push(listener);
    }
    listener(freeze(proxy));
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  return proxy;
};
