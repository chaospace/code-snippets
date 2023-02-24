/**
 * 스토어 테스트
 *
 */

import {STATE_ACTION, stateReducer} from '@/examples/observer/ObserverApp';
import {AnyStore, createObervable} from '@/examples/observer/factories';

describe('store동작테스트', () => {
  let store: AnyStore;
  beforeEach(() => {
    store = createObervable(stateReducer, {
      name: 'chaospace',
      age: 20
    });
  });
  it.skip('state를 변경하면 subscribe를 통해 수신이 가능', () => {
    store.subscribe((currentState: any) => {
      console.log('state-chagne', currentState);
    });

    store.dispatch({
      type: STATE_ACTION.CHANGE_AGE,
      payload: {age: 30}
    });
  });

  it.skip('정의되지 않은 액션값은 기본상태를 반환', () => {
    const initState = store.getState();
    store.dispatch({
      type: 'AAA',
      payload: {}
    });
    expect(store.getState()).toEqual(initState);
  });

  it.skip('중첩된 subscribe방지를 위한 참조 처리', () => {
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    const unSubListener1 = store.subscribe(listener1);

    store.dispatch({
      type: STATE_ACTION.CHANGE_AGE,
      payload: {
        age: 20
      }
    });

    expect(listener1).toBeCalledTimes(1);

    const unSubscribeNoNamed = store.subscribe(() => {
      console.log('change-', store.getState());
      const unSubListen2 = store.subscribe(listener2);
      unSubscribeNoNamed();
    });

    store.dispatch({
      type: STATE_ACTION.CHANGE_AGE,
      payload: {
        age: 10
      }
    });
    expect(listener1).toBeCalledTimes(2);
    expect(listener2).toBeCalledTimes(0);

    store.dispatch({
      type: STATE_ACTION.CHANGE_AGE,
      payload: {
        name: 'todo-list'
      }
    });
    expect(listener1).toBeCalledTimes(3);
    expect(listener2).toBeCalledTimes(1);

    unSubListener1();
    store.dispatch({
      type: STATE_ACTION.CHANGE_NAME,
      payload: {
        name: 'dddd'
      }
    });
    expect(listener1).toBeCalledTimes(3);
    expect(listener2).toBeCalledTimes(2);
  });

  it.skip('구독알림 중 추가되는 등록은 응답순서를 변경할 수 있다.', () => {
    const l1 = () => console.log('l1-called');
    const l2 = () => console.log('l2-called');
    const l3 = () => console.log('l3-called');
    const l4 = () => console.log('l4-called');

    store.subscribe(l1);
    const unSubl2 = store.subscribe(l2);
    const unSubNoName = store.subscribe(() => {
      l3();
      store.subscribe(l4);
      unSubNoName();
      unSubl2();
    });
    store.dispatch({
      type: STATE_ACTION.CHANGE_AGE,
      payload: {age: 50}
    });
    store.dispatch({
      type: STATE_ACTION.CHANGE_AGE,
      payload: {age: 20}
    });
    // store.dispatch({
    //   type: STATE_ACTION.CHANGE_AGE,
    //   payload: {age: 120}
    // });
    //store.subscribe(l3);
  });
  it('dispatch중에 action호출은 안된다', () => {
    expect(() => {
      store.dispatch({
        type: STATE_ACTION.UPDATE_IN_ACTION,
        payload: {
          action: () => {
            store.dispatch({
              type: STATE_ACTION.CHANGE_AGE,
              payload: {
                age: 1
              }
            });
          }
        }
      });
    }).toThrow('reducer완료 전 dispatch 요청을 안됩니다.');
  });
});
