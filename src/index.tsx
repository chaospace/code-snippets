import React from 'react';
import {useCallback, useState} from 'react';

import {createRoot} from 'react-dom/client';
import styled from 'styled-components';
// import ContextApp from './examples/context/ContextApp';
// import PostApp from './examples/context/PostApp';
// import ChatApp from './examples/effects/ChatApp';
// import NoneEffectApp from './examples/effects/NoneEffectApp';
// import ReducerApp from './examples/reducers/ReducerApp';
// import ReducerContextApp from './examples/reducers/ReducerContextApp';
// import RefApp from './examples/refs/RefApp';

import CounterApp from './examples/rerender/CounterApp';
import TicTacToe from './examples/tictactoe/TicTacToe';
import Carousel from './examples/ui/Carousel';

import GlobalStyle from './globalStyle';
import {VBox} from './ui/styled/Box';

import Input from './ui/styled/form/Input';
import {Text} from './ui/styled/Texts';
import ErrorPage from './views/ErrorPage';
const message = 'hello';

const PortalTestArea = () => {
  const [feedbackArea, setFeedbackArea] = useState<HTMLElement | undefined>(undefined);
  const feedbackRef = useCallback((node: HTMLElement) => {
    if (node !== null) {
      setFeedbackArea(node);
      return node;
    }
  }, []);

  return (
    <>
      <Input
        label="ref테스트"
        name="user_name"
        className="invalid"
        style={{
          flexDirection: 'row',
          borderColor: 'orange'
        }}
        feedbackPortalElement={feedbackArea}
      />
      <span style={{marginLeft: '70px'}} ref={feedbackRef}></span>
    </>
  );
};

const StyledCustomProp = styled.div
  .withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) => {
      return !['hidden'].includes(prop) && defaultValidatorFn(prop);
    }
  })
  .attrs({className: 'foo'})`
    color:red;
    &.foo {
      text-decoration:underline;
    }
`;

const appContainer = document.getElementById('app');
if (appContainer) {
  const root = createRoot(appContainer);
  root.render(
    <>
      <GlobalStyle />
      <VBox m={16} gap={16}>
        <Carousel />
        <TicTacToe />
        {/* <VBox gap={Space.xl} alignItems="center">
          <HeadLine>다른메시지는 그래도 있습니다.</HeadLine>
          <Text $type="h2">{message}</Text>
        </VBox>
        <GridBox gap={Space.xs} templateColumns="repeat(3, 1fr)" autoRows="auto">
          <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" />
          <div>열2</div>
          <div>열3</div>
        </GridBox> */}

        <CounterApp />

        {/* <ErrorPage>
          <Text>에러페이지는 어떻게 보이나 보자</Text>
        </ErrorPage>
        <PortalTestArea /> */}
        {/* <StyledCustomProp hidden>styled컴포넌트 속성 예외처리 컴포넌트</StyledCustomProp>
        <ReducerApp />
        <ContextApp />
        <PostApp />
        <ReducerContextApp />
        <Text>ref를 이용한 인풋 포커스 처리</Text>
        <RefApp />
        <NoneEffectApp />
        <ChatApp /> */}
      </VBox>
    </>
  );
}
