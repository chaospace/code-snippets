/**
 * react상태 처리 기본 구성해 보기
 */

import SimpleReact from './SimpleReact';

const MyReact = SimpleReact();

function Foo() {
  const [count, setCount] = MyReact.useState(0);
  MyReact.useEffect(() => {
    console.log('change-count-effect', count);
  }, [count]);

  MyReact.useEffect(() => {
    console.log('mount-effect');
  }, []);

  return {
    click() {
      setCount(prev => prev + 1);
    },
    render() {
      return `my-test-foo-count : ${count}`;
    }
  };
}

describe('심플리액트', () => {
  it('심플리액트 useState 확인해보기', () => {
    const fooInstance = MyReact.render(Foo);
    fooInstance.click();
    MyReact.render(Foo);
    console.log('222');
  });
});
