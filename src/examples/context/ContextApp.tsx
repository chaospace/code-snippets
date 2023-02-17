import React from 'react';
import {Heading, Section} from './elements';

function ContextApp() {
  return (
    <Section>
      <Heading>타이틀 텍스트!</Heading>
      <Section>
        <Heading>나는 서브 텍스트 입니다.</Heading>
        <Heading>나는 서브 텍스트 입니다.</Heading>
        <Section>
          <Heading>나는 서브 서브 텍스트 입니다.</Heading>
          <Heading>나는 서브 서브 텍스트 입니다.</Heading>
          <Section>
            <Heading>나는 서브 서브 텍스트 입니다.</Heading>
            <Heading>나는 서브 서브 텍스트 입니다.</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}

export default ContextApp;
