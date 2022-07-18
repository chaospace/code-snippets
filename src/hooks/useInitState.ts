import {useRef} from 'react';
// 초기화 체크 훅
function useInitState() {
  const init = useRef<boolean>(false);
  if (!init.current) {
    init.current = true;
    return false;
  }
  return init.current;
}

export default useInitState;
