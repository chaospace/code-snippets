// 리액트 스타일드 컴포넌트 모음
import React from 'react';
import styled from 'styled-components';
import colors from '../colors';
import {ButtonProps, FlexProps, InputProps, DisplaySizeProps, FlexContainerProps, GridContainerProps, ContainerProps} from './types/types';
import {
  getAlignStyle,
  getBorderStyle,
  getDisplayStyle,
  getFlexDirectionStyle,
  getFlexStyle,
  getGridStyle,
  getMarginStyle,
  getOverFlowStyle,
  getPaddingStyle,
  getPointerEventsStyle,
  getPositionStyle,
  getSizeStyle,
  getSpaceStyle,
  getTextStyle,
  getZIndexStyle
} from './core';

const Box = styled.div<FlexContainerProps>`
  ${props => getDisplayStyle(props.display ?? 'flex')};
  ${props => getPositionStyle(props.position ?? 'static')};
  ${props => getFlexDirectionStyle(props.flexDirection ?? 'row')};
  ${props => getFlexStyle(props)}
  ${props => getAlignStyle(props)}
  ${props => getZIndexStyle(props)};
  ${props => getSizeStyle(props)};
  ${props => getSpaceStyle(props)};
  ${props => getOverFlowStyle(props)};
  ${props => getBorderStyle(props)};
  ${props => getPointerEventsStyle(props)};
`;

const HBox = styled(Box).attrs({flexDirection: 'row'})``;
const VBox = styled(Box).attrs({flexDirection: 'column'})``;

const Spacer = styled.span<FlexProps & DisplaySizeProps>`
  ${props => getFlexStyle(props)};
  ${props => getSizeStyle(props)};
`;

const GridBox = styled.div<GridContainerProps>`
  display: grid;
  ${props => getGridStyle(props)};
  ${props => getMarginStyle(props)};
  ${props => getPaddingStyle(props)};
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

const Form = styled(Box).attrs({
  as: 'form',
  flexDirection: 'column'
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

export {Box, HBox, VBox, GridBox, Spacer, StyledInput, Form, StyledLine, StyledButton};
