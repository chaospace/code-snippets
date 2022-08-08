import {useState} from 'react';
import MemoPropsComponent from './MemoPropsComponent';
import MemoRenderComponent from './MemoRenderComponent';
import NoneMemoComponent from './NoneMemoComponent';
import RenderTimerElement from './RenderTimerElement';

function getList() {
  let itemArr: string[] = [];
  for (let i = 0; i < 200; i++) {
    itemArr.push(String.fromCharCode(Math.floor(Math.random() * 1000)));
  }
  return itemArr;
}
const list1 = getList();
const list2 = getList();
const list3 = getList();
function RenderApp() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>re-render{count}</button>
      <NoneMemoComponent list={list1} />
      <MemoPropsComponent list={list2} />
      <MemoRenderComponent list={list3} />
    </>
  );
}

export default RenderApp;
