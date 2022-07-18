// 훅 테스트

import useUpdateCallback from '@/hooks/useUpdateCallback';
import {render, renderHook, act, screen} from '@testing-library/react';
import React, {useCallback, useState} from 'react';
import userEvent from '@testing-library/user-event';
import useCountHookMock from './__mocks__/useCountHookMock';
// hook테스트용 컴포넌트 선언
const Foo = () => {
  const [count, setCount] = useState(0);
  const effect = useCallback(() => {
    console.log('callback-called');
  }, []);
  useUpdateCallback(effect, [count]);
  return (
    <button
      onClick={() => {
        setCount(1);
      }}
    >
      {count}
    </button>
  );
};

describe('hook테스트', () => {
  it.skip('생애주기 관련 hook은 render를 통해 동작확인', async () => {
    const user = userEvent.setup();
    render(<Foo />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('0');
    await user.click(button);
    expect(button).toHaveTextContent('1');
  });

  it('생애주기와 관련없는 훅은 renderHook과 act를 통해 동작확인', () => {
    const {result} = renderHook(() => useCountHookMock());
    act(() => result.current.increment());
    expect(result.current.count).toEqual(1);
    act(() => result.current.decrement());
    expect(result.current.count).toEqual(0);
  });
});
