//import React from "react";
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import styled from 'styled-components';
import {Space} from './ui/space';
import {VBox} from './ui/styled/elements';
const message = 'hello';
const MyBox = styled.div`
  display: flex;
  font-size: 60px;
  font-weight: bold;
  color: gray;
`;

const Wrapper = styled.div`
  position: relative;
  color: blue;
`;
const appContainer = document.getElementById('app');
if (appContainer) {
  const root = createRoot(appContainer);
  root.render(
    <Wrapper>
      <VBox gap={Space.xl} alignItems="center">
        <div>다른메시지는 그래도 있습니다.</div>
        <MyBox>{message}</MyBox>
      </VBox>

      <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" />
    </Wrapper>
  );
}
