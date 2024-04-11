/**
 * 속성 변경을 감지하기 위한 옵저버
 */

import { ObjType } from '@/types/types';
export default <T extends ObjType, S>(model: T, stateGetter: () => S) => {
  let listeners: Function[] = [];

  const addChangeListener = (cb: Function) => {
    listeners.push(cb);
    cb(Object.freeze(stateGetter()));
    return () => {
      listeners = listeners.filter(l => l !== cb);
    };
  };

  const invokeListeners = () => {
    const data = Object.freeze(stateGetter());
    listeners.forEach(l => l(data));
  };

  const wrapAction = (action: Function) => {
    return (...args: any) => {
      const value = action(...args);
      //console.log('value', value);
      if (value) {
        invokeListeners();
      }

      return value;
    };
  };

  const baseProxy = {
    addChangeListener
  };

  // 객체 key중 함수 타입을 추출해 curring을 이용한 noti 처리
  return Object.keys(model)
    .filter(key => typeof model[key] === 'function')
    .reduce((proxy: ObjType, key: string) => {
      const action = model[key];
      return {
        ...proxy,
        [key]: wrapAction(action)
      };
    }, baseProxy);
};
