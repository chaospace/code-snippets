/**
 * obserbable구현
 *
 * 상태와 컨트롤을 나누냐 합치느냐.. 그것이 문제로다.
 *
 * 순수 초기 상태를 가지고 observable을 구성할 수 있느냐?
 * 아니다. 결국 컨트롤( reducer )역할을 하는 함수는 받아야 한다.
 *
 * notify를 던지는 역할도 결국 상태를 참조하기 않으면
 * 데이터를 넘길 수 없다.
 *
 * store는
 * - subscribe를 통한 정보 변경 알림
 * - dispatch를 통한 정보 조작
 * - getState를 통한 현재 상태 반환
 * 이라는 조건을 갖추어야 함.
 *
 *
 * observer동기화 시점에 대한 정리
 * 구독 등록 시점
 *  - 이전과 현재가 동일참조면 참조 갱신
 *    - 알림 시점에 참조가 동일하게 유지되므로
 *      구독 요청 시 변화가 있다면 동기화 된다?
 *      - 그럴 경우가 생기나?
 * 구독 해지 시점
 *  - 이전과 현재가 동일참조면 참조 갱신
 * 알림 시점
 *  - 이전 정보에 현재 참조 설정.
 */

import type {Listener} from './types';

type Collection = ReturnType<typeof createListenerCollection>;

const createListenerCollection = () => {
  let listeners: Listener[] | null = [];
  let nextListeners: Listener[] = [];

  // subscribe전달 중 변경을 방지하기 위한 참조 갱신.
  const ensureCanMutateNextListeners = () => {
    if (nextListeners === listeners) {
      nextListeners = listeners.map(l => l);
    }
  };

  const createUnsubscribe = (idx: number) => () => {
    ensureCanMutateNextListeners();
    nextListeners.splice(idx, 1);
    listeners = null;
  };
  /**
   * 리스너 추가는 배열로 하면 간단하지만 제거 시 filter로 인해
   * 루프를 돌아야 함.
   * @param listener
   * @returns
   */
  const subscribe = (listener: Listener) => {
    ensureCanMutateNextListeners();
    const unsubscribe = createUnsubscribe(nextListeners.length);
    nextListeners.push(listener);
    return unsubscribe;
  };

  const invoke = (data: any) => {
    const ls = (listeners = nextListeners);
    for (const l of ls) {
      l(data);
    }
  };

  const clear = () => {
    listeners = nextListeners = [];
  };

  return {
    subscribe,
    clear,
    invoke
  };
};

/**
 * 옵저버블 구현 시  고려사항
 * notify시 data를 전달해야 한다면
 * data를 observable에서 관리해야 되나?
 *
 * store에서 getState를 제공하면 이것은 선택에 문제로 넘어가게 됨.
 * notify시 상태를 넘겨도 되고
 * 해당 위치에서 땡겨가도 되고..
 * @returns
 */
type AnyAction<S extends AnyState = {}> = {
  type: string;
  payload: Partial<S>;
};
type AnyState = {[key: string]: any};
type AnyReducer<S extends AnyState> = (state: S, action: AnyAction<S>) => S;
type AnyStore = ReturnType<typeof createObervable>;
const deepClone = (state: AnyState) => JSON.parse(JSON.stringify(state));
const freeze = (state: AnyState) => Object.freeze(deepClone(state));
const createObervable = <S extends AnyState>(reducer: AnyReducer<S>, initState: S) => {
  let init = false;
  let collections: Collection;
  let state = freeze(initState);
  const initialize = () => {
    if (!init) {
      init = true;
      collections = createListenerCollection();
    }
  };

  const invokeSubscribers = (data: any) => {
    collections.invoke(data);
  };

  const clear = () => {
    init = false;
    collections.clear();
  };

  let isDispatching = false;

  return {
    subscribe(l: Listener) {
      initialize();
      return collections.subscribe(l);
    },
    dispatch(action: AnyAction) {
      if (isDispatching) {
        throw new Error('reducer완료 전 dispatch 요청을 안됩니다.');
      }
      try {
        isDispatching = true;
        const nextState = reducer(freeze(state), action);
        if (JSON.stringify(nextState) !== JSON.stringify(state)) {
          state = deepClone(nextState);
          invokeSubscribers(freeze(nextState));
        }
      } finally {
        isDispatching = false;
      }
    },
    getState() {
      return freeze(state);
    }
  };
};

export type {AnyReducer, AnyAction, AnyState, AnyStore};
export {createObervable};
