import {useEffect} from 'react';
import useInitState from './useInitState';

/**
 * 참조 대상 변경 시 처리 훅
 * @param deps:any[]
 * @param deep:boolean
 */
function useUpdateCallback(callback: (...args: any[]) => void, deps: any[], deep = false) {
  const init = useInitState();

  useEffect(() => {
    console.log('useUpdateCallback-init', init, deps);
    //deep && callback();
    (init || deep) && callback.apply(null, deps);
  }, deps);
}

export default useUpdateCallback;
