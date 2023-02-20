/**
 * eventBus적용
 */

export default (model: Function) => {
  let listeners: Function[] = [];
  let state = model();

  const subscribe = (listener: Function) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  const invokeSubscribers = () => {
    const data = Object.freeze(state);
    listeners.forEach(l => l(data));
  };

  const dispatch = (event: Object) => {
    const newState = model(state, event);
    if (!newState) {
      throw new Error('model should always return a value!!');
    }
    // 모델이 동일하면 리턴
    if (newState === state) {
      return;
    }
    // 변경상태를 저장하고 알림
    state = newState;
    invokeSubscribers();
  };

  return {
    dispatch,
    subscribe,
    getState: () => Object.freeze(state)
  };
};
