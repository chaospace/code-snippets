import theme from '@/theme';
import React, {ReactNode} from 'react';
import {css, ThemeProvider} from 'styled-components';

/**
 * 테마에 타입별 스타일을 지정하고
 * 기본 속성이 설정되면 이를 무시하는 방향으로 사용하는 방향이 좋을 거 같음.
 */

const AppProvider = ({children}: {children: ReactNode}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppProvider;
