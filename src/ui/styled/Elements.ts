// 리액트 스타일드 컴포넌트 모음
import React from 'react';
import styled, {CSSProperties} from 'styled-components';
import colors from '../colors';
import {
  ButtonProps,
  FlexProps,
  InputProps,
  DisplaySizeProps,
  GridContainerProps,
  ContainerProps
} from './types/types';
import {
  getBorderStyle,
  getFlexStyle,
  getMarginStyle,
  getPaddingStyle,
  getSizeStyle,
  getStyleProps,
  getTextStyle
} from './core';
import {VBox} from './Box';

const Spacer = styled.span<FlexProps & DisplaySizeProps>`
  ${props => getFlexStyle(props)};
  ${props => getSizeStyle(props)};
`;

const StyledButton = styled.button<CSSProperties>`
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  user-select: none;
  ${props => {
    return getStyleProps(props);
  }};
`;

StyledButton.defaultProps = {
  color: colors.gray07,
  fontSize: '12px'
};

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
