import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import styled from 'styled-components';
const MyText = styled.h1`
  color: black;
  font-size: 12px;
`;

test('button-render-test', () => {
  render(<MyText as="h3">hello</MyText>);
  expect(screen.getByText('hello')).toBeInTheDocument();
});
