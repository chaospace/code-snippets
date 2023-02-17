import React from 'react';
import {PropsWithChildren, useContext} from 'react';
import styled from 'styled-components';
import LevelContext from './LevelContext';

type SectionProps = {
  isFancy?: boolean;
};

const StyledSection = styled.div<SectionProps>`
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: ${({isFancy}) => (isFancy ? `3px dotted pink` : ` 1px solid #aaa`)};
`;

const Section = ({children, isFancy = false}: PropsWithChildren<SectionProps>) => {
  const level = useContext(LevelContext);
  return (
    <StyledSection isFancy={isFancy}>
      <LevelContext.Provider value={level + 1}>{children}</LevelContext.Provider>
    </StyledSection>
  );
};

const Heading = ({children}: PropsWithChildren<{}>) => {
  const level = useContext(LevelContext);
  console.log('level', level);
  let content = <h6>{children}</h6>;
  switch (level) {
    case 1:
      content = <h1>{children}</h1>;
      break;
    case 2:
      content = <h2>{children}</h2>;
      break;
    case 3:
      content = <h3>{children}</h3>;
      break;
    case 4:
      content = <h4>{children}</h4>;
      break;
    case 5:
      content = <h5>{children}</h5>;
      break;
  }

  return content || null;
};

export {Section, Heading};
