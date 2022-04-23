import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import styled, {StyledComponent} from 'styled-components';
const MyText = styled.h1`
  color: black;
  font-size: 12px;
`;

function getStyledCompStyle(Component: StyledComponent<'div', any>, index = 0) {
  const compClass = Component?.styledComponentId;
  const compRoots = document.getElementsByClassName(compClass);
  //console.log('compRoots', compClass, 'compRoots[index]', compRoots[index]);
  return global.window.getComputedStyle(compRoots[index] as Element);
}

// RTL 기본동작 테스트
test('button-render-test', () => {
  render(<MyText as="h3">hello</MyText>);
  const button = screen.getByText('hello');
  expect(button).toBeInTheDocument();
});

test('button-style-test', () => {
  render(<MyText as="h3">hello</MyText>);
  const style = getStyledCompStyle(MyText);
  expect(style.display).toEqual('block');
  expect(style.color).toEqual('black');
  expect(style['font-size']).toEqual('12px');
});
