//import React from "react";
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import styled from 'styled-components';
import {Space} from './ui/space';
import {GridBox, VBox} from './ui/styled/Box';
import {Text, HeadLine} from './ui/styled/Texts';
const message = 'hello';

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
        <HeadLine>다른메시지는 그래도 있습니다.</HeadLine>
        <Text $type="h2">{message}</Text>
      </VBox>
      <GridBox gap={Space.xs} templateColumns="repeat(3, 1fr)" autoRows="auto">
        <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" />
        <div>열2</div>
        <div>열3</div>
      </GridBox>
    </Wrapper>
  );
}
