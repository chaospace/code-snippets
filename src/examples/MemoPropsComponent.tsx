// 속성 메모 컴포넌트
import React, {useMemo} from 'react';
import {PropsWithChildren} from 'react';
import RenderTimerElement from './RenderTimerElement';

function MemoPropsComponent({list}: PropsWithChildren<{list: string[]}>) {
  const s = performance.now();
  const filterdList = useMemo(() => {
    const arr = list.sort((a, b) => (a > b ? 1 : a === b ? 0 : -1));
    console.log('MemoPropsComponent-배열 정렬', performance.now() - s);
    return arr;
  }, [list]);
  return (
    <div>
      {filterdList.map((item, idx) => {
        return <span key={`${item}_${idx}`}>{item}</span>;
      })}
      <RenderTimerElement startTime={s} />
    </div>
  );
}

export default MemoPropsComponent;
