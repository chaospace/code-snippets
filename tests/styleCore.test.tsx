/**
 * style제어 함수 테스트
 * 컴포넌트의 속성을 모두 구분하지 않고 한 덩어리로 관리해보자.
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styled, { css, CSSProperties, StyledComponent } from 'styled-components';
import AppProvider from './__mocks__/appMock';
import { ObjType } from '@/types/types';
//HTMLAttribute
//camelCase를 snakeCase로 변경
const getStyleProps = (props: ObjType) => {
  let style = '';
  for (let prop in props) {
    const snakeKey = prop.replace(/(\p{Ll})(\p{Lu})/gu, `$1-$2`).toLowerCase();
    style += `${snakeKey}: ${props[prop]};`;
  }
  return style;
};

function getStyledCompStyle(Component: StyledComponent<'div', any>, index = 0) {
  const compClass = Component?.styledComponentId;
  const compRoots = document.getElementsByClassName(compClass);
  return global.window.getComputedStyle(compRoots[index] as Element);
}

type StyleProperty = CSSProperties & { theme: any };
const MyComp = styled.div<StyleProperty>`
  ${props => props.theme?.button && css(props.theme.button)};
  ${({ theme, ...rest }) => rest && getStyleProps(rest)};
`;

const adjustHexColor = (color: string, value = 0) => {
  const hasPrefix = color.indexOf('#');
  const num = parseInt(color, 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + value));
  const g = Math.max(0, Math.min(255, (num >> 8) + value));
  const b = Math.max(0, Math.min(255, num & 0x0000ff));
  const result = ((r << 16) | (g << 8) | b).toString(16);
  return `#${result}`;
};

const adjustHexColor2 = (color: string, value = 0) => {
  const hasPrefix = color.indexOf('#');
  const num = parseInt(color, 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + value));
  const g = Math.max(0, Math.min(255, (num >> 8) + value));
  const b = Math.max(0, Math.min(255, num & 0x0000ff));
  const result = (b | (g << 8) | (r << 16)).toString(16);
  return `#${result}`;
};

test('hex코드변환 테스트', () => {
  const c = '#FFCC00';
  console.log('base-', adjustHexColor(c, 20));
  console.log('base-2', adjustHexColor2(c, 20));
});

// const mediaQuries = (args: any) => css`
//   @media screen and (max-width: 320px) {
//     ${css(args)};
//   }
// `;

// describe('스타일 속성 변환 테스트', () => {
//   it.skip('camelCase로 전달하면 kebab-case의 스타일 문자열로 반환한다.', () => {
//     const styleMessage = getStyleProps({
//       fontSize: 10,
//       color: 'red',
//       border: '1px solid balck',
//       borderRadius: 3
//     });
//     console.log('result', styleMessage);

//     const style = css`
//       font-size: 10px;
//       border: 1px solid black;
//       display: absolute;
//     `;
//     console.log('css-style', style);
//     console.log(
//       'aa',
//       css`
//         ${styleMessage}
//       `
//     );
//   });

// });

test('스타일 적용 테스트', () => {
  //render(<Foo as="h3">aa</Foo>);
  console.log(document.body.style.hasOwnProperty('color'));
  render(<MyComp color="red">test</MyComp>, {
    wrapper: AppProvider
  });
  const comp = screen.getByText('test');
  const style = getStyledCompStyle(MyComp);
  console.log('style', style, 'style.userSelect', style.userSelect);
  expect(style.color).toEqual('red');
});

// const theme = {
//   button: css`
//     cursor: pointer;
//     border: none;
//     user-select: none;
//   `
// };

// test('css함수 테스트', () => {
//   console.log('theme.button', theme.button);
//   const a = mediaQuries(theme.button);
//   console.log('a', a);
// });
