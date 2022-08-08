// 메모를 사용하지 않는 컴포넌트
import React, {PropsWithChildren, useEffect} from 'react';
import RenderTimerElement from './RenderTimerElement';

function NoneMemoComponent({list}: PropsWithChildren<{list: string[]}>) {
  const s = performance.now();
  const filterdList = list.sort((a, b) => (a > b ? 1 : a === b ? 0 : -1));
  console.log('NoneMemoComponent-배열정렬', performance.now() - s);
  return (
    <div>
      {filterdList.map((item, idx) => {
        return <span key={`${item}_${idx}`}>{item}</span>;
      })}
      <RenderTimerElement startTime={s} />
    </div>
  );
}
export default NoneMemoComponent;
