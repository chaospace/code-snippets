// rerender를 이용한 속성갱신 테스트

import {render, screen} from '@testing-library/react';
import React, {useRef} from 'react';

let idCounter = 1;
const Foo = ({number}: any) => {
  const id = useRef(idCounter++);

  return (
    <div>
      <span data-my-test-id="number-display">{number}</span>
      <span data-my-test-id="instance-id">{id.current}</span>
    </div>
  );
};

describe('rerender를 이용한 속성 업데이트', () => {
  it('rerender를 이용한 컴포넌트 속성 업데이트', () => {
    const {rerender} = render(<Foo number={1} />);
    expect(screen.getByTestId('number-display')).toHaveTextContent('1');
    rerender(<Foo number={2} />);
    expect(screen.getByTestId('number-display')).toHaveTextContent('2');
    expect(screen.getByTestId('instance-id')).toHaveTextContent('1');
  });
});
