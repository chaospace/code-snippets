/**
 * 훅을 이용한 이전 값 변경 메모처리 테스트
 */

import {renderHook} from '@testing-library/react';
import {useEffect, useMemo, useRef, useState, useSyncExternalStore} from 'react';

type SelectCallback<T> = (state: T) => T[keyof T];
type SnapShotCallback<T> = () => T;
type Store = {
  name: string;
  age: number;
};

let state: Store = {
  name: 'chaopsace',
  age: 30
};
const getState = () => ({...state});

const setName = (n: string) => {
  state.name = n;
  notify();
};

const notify = () => {
  for (const l of listeners) {
    l();
  }
};

const setAge = (n: number) => {
  state.age = n;
  notify();
};

let listeners: Function[] = [];
const subscribe = (listener: Function) => {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
};
/**
 * 셀렉터를 통한 변경감지 원리
 * 원본 상태를 메모,
 * 셀렉터를 통해 반한된 값을 메모
 *
 * 상태와, 셀렉터를 디펜던시로 걸고 메모 시작
 * @param select
 */
function useMemoizeSelector<T>(snapshot: SnapShotCallback<T>, select: SelectCallback<T>) {
  let inst: any;

  const instRef = useRef<{hasValue: boolean; value: T | null} | null>(null);
  const getSnapShotRef = useRef<Function>(null as any);
  const [_, forceUpdate] = useState({instRef});
  if (instRef.current == null) {
    inst = {
      hasValue: false,
      value: null
    };
  } else {
    instRef.current = inst;
  }
  /**
   * 변경 추적을 위한 메모적용
   */
  const getSnapShot = useMemo(() => {
    let hasMemo = false;
    let memoizeSnapShot: T;
    let memoizeSelection: T[keyof T];
    const memoizeSelector = (nextSnapShot: T) => {
      console.group('memoize-selector-called');
      if (!hasMemo) {
        console.log('메모초기화!');
        hasMemo = true;
        memoizeSnapShot = nextSnapShot;
        const nextSelection = select(nextSnapShot);
        // snapshot 혹은 selector의 참조가 변경되도 내부에서 기억하는 값이 있으면 비교처리
        // 이 처리가 있는 이유는 react특성상 인라인 함수를 사용할 경우 항상 참조가 변경에 따른 초기화가 발생하기 때문..
        if (inst.hasValue) {
          // 이전값과 비교해 변화가 없으면 이전 값을 리턴하고 종료
          if (Object.is(nextSelection, inst.value)) {
            console.log('inst-value와 동일');
            memoizeSelection = inst.value;
            return nextSelection;
          }
        }
        //console.log('초기값 기억', memoizeSelection, 'inst.value', inst.value);
        // 현재 값을 기억하고 리턴하며 종료
        memoizeSelection = nextSelection;
        return nextSelection;
      }

      // 이전상태와 요청 상태가 동일하면 이전 값 사용
      if (Object.is(memoizeSnapShot, nextSnapShot)) {
        console.log('snapshot-동일');
        return memoizeSelection;
      }
      // 상태가 변경되도 셀렉터를 통해 취하고 싶은 값은 변경이 없을 수 있으니 체크!
      const nextSelection = select(nextSnapShot);
      if (Object.is(memoizeSelection, nextSelection)) {
        console.log('selection-동일');
        return memoizeSelection;
      }

      // 값이 변경되면 새 값을 기억하고 리턴
      memoizeSnapShot = nextSnapShot;
      memoizeSelection = nextSelection;
      console.groupEnd();
      return nextSelection;
    };
    const getSelection = () => memoizeSelector(snapshot());
    return getSelection;
  }, [snapshot, select]);

  const value = useSyncExternalStore(subscribe, getSnapShot);

  useEffect(() => {
    inst.hasValue = true;
    inst.value = value;
    console.log('====change-vlaue', inst);
  }, [value]);

  return value;
}
const selectName = (source: Store) => source.name;
describe('memo를 이용한 getter함수 추적', () => {
  it('getSelection함수 메모하기', () => {
    const {result, rerender} = renderHook(() => useMemoizeSelector<Store>(getState, selectName));
    // const {result: ageResult} = renderHook(() =>
    //   useMemoizeSelector<Store>(getState, source => source.age)
    // );
    //console.log('result', result.current);
    //console.log('ageResult', ageResult.current);
    setName('react');
    //rerender();
    //console.log('======', result.current);
    setName('react');

    //setAge(2);
    //const {result} = renderHook(() => useMemoizeSelector<Store>(getState, source => source.name));
  });
});
