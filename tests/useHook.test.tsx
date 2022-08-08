// 훅 사용과 re-rerender에 대한 고찰
import React, {useMemo, useState} from 'react';
import {fireEvent, render} from '@testing-library/react';
import MemoPropsComponent from '@/examples/MemoPropsComponent';
import NoneMemoComponent from '@/examples/NoneMemoComponent';
import MemoRenderComponent from '@/examples/MemoRenderComponent';

// 초기 아이템 구성
let itemArr: string[] = [];
const initItem = () => {
  for (let i = 0; i < 200; i++) {
    itemArr.push(String.fromCharCode(Math.floor(Math.random() * 1000)));
  }
};

beforeEach(() => {
  console.log('배열 초기화');
  initItem();
});

// const NoneMemoFoo = () => {
//   console.log('redner--NoneMemoFoo');
//   const startTime = performance.now();
//   itemArr = itemArr.sort((a, b) => (a > b ? 1 : a === b ? 0 : -1));
//   console.log('배열 초기화 시간', performance.now() - startTime);
//   return (
//     <div>
//       {itemArr.map((item, idx) => {
//         return <span key={`${item}_${idx}`}>{item}</span>;
//       })}
//     </div>
//   );
// };

// const UseMemoFoo = () => {
//   console.log('redner--UseMemoFoo');
//   const startTime = performance.now();
//   const sortedItem = useMemo(() => {
//     return itemArr.sort((a, b) => (a > b ? 1 : a === b ? 0 : -1));
//   }, [itemArr]);
//   console.log('배열 초기화 시간', performance.now() - startTime);
//   return (
//     <div>
//       {sortedItem.map((item, idx) => {
//         return <span key={`${item}_${idx}`}>{item}</span>;
//       })}
//     </div>
//   );
// };

// const MemoList = () => {
//   console.log('redner--MemoList');
//   const startTime = performance.now();
//   const ItemList = useMemo(() => {
//     itemArr = itemArr.sort((a, b) => (a > b ? 1 : a === b ? 0 : -1));
//     return (
//       <>
//         {itemArr.map((item, idx) => {
//           return <span key={`${item}_${idx}`}>{item}</span>;
//         })}
//       </>
//     );
//   }, []);
//   console.log('배열 초기화 시간', performance.now() - startTime);
//   return <div>{ItemList}</div>;
// };

const LastElement = ({startTime}: {startTime: number}) => {
  const diff = performance.now() - startTime;
  console.log('돔 구성 완료시간', diff);
  return null;
};

const TestApp = ({children}: any) => {
  const startTime = performance.now();
  return (
    <>
      {children}
      <LastElement startTime={startTime} />
    </>
  );
};

describe.skip('혹 어떻게 사용하는 것이 좋은지 이것저것 테스트', () => {
  it.skip('컴포넌트 속성 memo 사용 구성', () => {
    render(
      <TestApp>
        <MemoPropsComponent list={itemArr} />
      </TestApp>
    );
  });
  it.skip('컴포넌트 속성 memo사용없이 구성', () => {
    render(
      <TestApp>
        <NoneMemoComponent list={itemArr} />
      </TestApp>
    );
  });
  it('목록 구성을 memo로 구성', () => {
    render(
      <TestApp>
        <MemoRenderComponent list={itemArr} />
      </TestApp>
    );
  });
});

const ReRenderApp = ({children}: any) => {
  const [count, setCount] = useState<number>(0);
  const startTime = performance.now();
  return (
    <>
      <button onClick={() => setCount(prev => prev + 1)}>re-render-{count}</button>
      {children}
      <LastElement startTime={startTime} />
    </>
  );
};

describe('re-rendering시 반응 시간 테스트', () => {
  it.skip('컴포넌트 속성 memo 사용 구성', () => {
    const {getByRole} = render(
      <ReRenderApp>
        <MemoPropsComponent list={itemArr} />
      </ReRenderApp>
    );
    const btnEle = getByRole('button');
    fireEvent.click(btnEle);
  });
  it('컴포넌트 속성 memo사용없이 구성', () => {
    const {getByRole} = render(
      <ReRenderApp>
        <NoneMemoComponent list={itemArr} />
      </ReRenderApp>
    );
    const btnEle = getByRole('button');
    fireEvent.click(btnEle);
  });
  it.skip('목록 구성을 memo로 구성', () => {
    const {getByRole} = render(
      <ReRenderApp>
        <MemoRenderComponent list={itemArr} />
      </ReRenderApp>
    );
    const btnEle = getByRole('button');
    fireEvent.click(btnEle);
  });
});
