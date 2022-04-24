// 리액트 스타일드 컴포넌트 모음
import React from 'react';
import styled from 'styled-components';
import colors from '../colors';
import {ButtonProps, FlexProps, InputProps, DisplaySizeProps, GridContainerProps, ContainerProps} from './types/types';
import {getFlexStyle, getMarginStyle, getPaddingStyle, getSizeStyle, getTextStyle} from './core';
import {VBox} from './Box';

const Spacer = styled.span<FlexProps & DisplaySizeProps>`
  ${props => getFlexStyle(props)};
  ${props => getSizeStyle(props)};
`;

const StyledButton = React.memo(styled.button<ButtonProps>`
  background-color: transparent;
  background: none;
  border: none;
  outline: none;
  user-select: none;
  cursor: pointer;
  ${props => getTextStyle(props)};
  font-weight: bold;
  && {
    ${props => getPaddingStyle(props)};
  }
`);

const Form = styled(VBox).attrs({
  as: 'form'
})``;

const StyledInput = styled.input<InputProps>`
  ${props => getMarginStyle(props)};
  ${props => getFlexStyle(props)};
  ${props => getSizeStyle(props)};
  && {
    ${props => getPaddingStyle(props)};
  }
`;

const StyledLine = styled.hr<DisplaySizeProps & {color?: string | number}>`
  align-self: stretch;
  background-color: ${props => props.color || colors.gray01};
  margin: 0;
  border: 0;
  ${props => getSizeStyle(props)};
`;

export {Spacer, StyledInput, Form, StyledLine, StyledButton};
