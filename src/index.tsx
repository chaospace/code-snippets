//import React from "react";
import {useCallback, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import styled from 'styled-components';

import CounterApp from './examples/rerender/CounterApp';

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

const Wrapper = styled.div`
  position: relative;
  color: blue;
`;

const appContainer = document.getElementById('app');
if (appContainer) {
  const root = createRoot(appContainer);
  root.render(
    <>
      <GlobalStyle />
      <VBox gap={16}>
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
        <ErrorPage>
          <Text>에러페이지는 어떻게 보이나 보자</Text>
        </ErrorPage>
        <PortalTestArea />

        <StyledCustomProp hidden>어떻게 보일가</StyledCustomProp>
      </VBox>
    </>
  );
}
