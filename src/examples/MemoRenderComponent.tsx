// render처리에 memo적용

import {PropsWithChildren, useMemo} from 'react';
import RenderTimerElement from './RenderTimerElement';

function MemoRenderComponent({list}: PropsWithChildren<{list: string[]}>) {
  const s = performance.now();
  const memorizeList = useMemo(() => {
    const filterdList = list.sort((a, b) => (a > b ? 1 : a === b ? 0 : -1));
    console.log('MemoRenderComponent-배열 정렬', performance.now() - s);
    return filterdList.map((item, idx) => {
      return <span key={`${item}_${idx}`}>{item}</span>;
    });
  }, [list]);
  return (
    <div>
      {memorizeList}
      <RenderTimerElement startTime={s} />
    </div>
  );
}

export default MemoRenderComponent;
