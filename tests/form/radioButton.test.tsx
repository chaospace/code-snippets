import React from 'react';
// 라디오 버튼 테스트
import RadioButton from '@/ui/styled/form/RadioButton';
import {render, screen} from '@testing-library/react';
import AppProvider from '../__mocks__/appMock';
import {getStyledCompStyle} from '../__mocks__/styleMock';

describe('라디오 버튼 컴포넌트 테스트', () => {
  it('style속성을 통해 스타일이 넘어오면 내부에서 속성으로 접근할 수 있다.', () => {
    render(
      <RadioButton
        data-test-id="container"
        style={{
          fontWeight: 'bold',
          color: 'red'
        }}
      >
        체크박스
      </RadioButton>,
      {
        wrapper: AppProvider
      }
    );
    const radioInput = screen.getByTestId('container');
    const label = screen.getByText('체크박스');
    console.log('radioInput.style', radioInput);
    console.log('label.style', label.style);
    //screen.debug();
  });
});
