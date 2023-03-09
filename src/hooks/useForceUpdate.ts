/**
 * 화면 강제갱신 처리 훅
 */

import {useMemo, useState} from 'react';

function useForceUpdate() {
  const [_, setState] = useState(0);
  const _forceUpdate = useMemo(() => {
    return () => {
      setState(prev => prev + 1);
    };
  }, []);

  return _forceUpdate;
}

export default useForceUpdate;
