// 리액트 스타일드 컴포넌트 모음
import React from "react";
import styled, { css } from "styled-components";
import colors from "../colors";
import {
  getAlignStyle,
  getBorderStyle,
  getDisplayStyle,
  getFlexStyle,
  getGridStyle,
  getMarginStyle,
  getOverFlowStyle,
  getPaddingStyle,
  getPointerEventsStyle,
  getSizeStyle,
  getSpaceStyle,
  getTextStyle,
  getZIndexStyle,
  StyledButtonProps,
  StyledFlexProps,
  StyledGridLayoutProps,
  StyledInputProps,
  StyledLayoutProps,
  StyledSizeProps,
  StyledTypoProps
} from "./types/types";

const Box = styled.div<StyledLayoutProps>`
  position: ${props => (props.position ? props.position : "static")};
  display: ${props => (props.$display ? props.$display : "flex")};
  flex-direction: ${props => (props.flexDirection ? "column" : "")};
  ${props =>
    props.boxShadow &&
    css`
      border: 1px solid ${colors.gray02};
      box-shadow: 0px 1px 4px 0px rgba(171, 185, 203, 0.37);
      border-radius: 16px;
    `};
  background-color: ${props => props.bgColor};
  ${props =>
    props.$display === undefined || props.$display.indexOf("flex") >= 0
      ? getFlexStyle(props)
      : ""}
  ${props =>
    props.$display === undefined || props.$display.indexOf("flex") >= 0
      ? getAlignStyle(props)
      : ""}
  ${props => getZIndexStyle(props)};
  ${props => getSizeStyle(props)};
  ${props => getSpaceStyle(props)};

  ${props => getOverFlowStyle(props)};
  ${props => getBorderStyle(props)};
  ${props => getPointerEventsStyle(props)};
`;

const HBox = styled(Box)`
  flex-direction: row;
`;

const VBox = styled(Box)`
  flex-direction: column;
`;

const Spacer = styled.span<StyledFlexProps & StyledLayoutProps>`
  ${props => getFlexStyle(props)};
  ${props =>
    props.$display === undefined || props.$display.indexOf("flex") >= 0
      ? getAlignStyle(props)
      : ""}
  ${props => getSizeStyle(props)};
`;

const StyledText = styled.p<StyledTypoProps>`
  ${props => props.$display && getDisplayStyle(props)};
  ${props => getTextStyle(props)};
  ${props => getSpaceStyle(props)};
  ${props => getBorderStyle(props)};
`;

const StyledHeadLine = styled(StyledText)`
  font-weight: bold;
  ${props => getSpaceStyle(props)};
  color: ${props => props.$color || colors.gray08};
`;

const GridBox = styled.div<StyledGridLayoutProps>`
  display: grid;
  ${props => getGridStyle(props)};
  ${props => getMarginStyle(props)};
  ${props => getPaddingStyle(props)};
  ${props =>
    props.boxShadow &&
    css`
      border: 1px solid ${colors.gray02};
      box-shadow: 0px 1px 4px 0px rgba(171, 185, 203, 0.37);
      border-radius: 16px;
    `};
`;

const StyledButton = React.memo(styled.button<StyledButtonProps>`
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

const StyledForm = styled.form<StyledLayoutProps>`
  display: flex;
  flex-direction: ${props => props.flexDirection || "column"};
  background-color: ${props => props.bgColor || "transparent"};
  ${props => getFlexStyle(props)};
  ${props => getAlignStyle(props)};
  ${props => getSpaceStyle(props)};
  ${props => getSizeStyle(props)};
  ${props => getOverFlowStyle(props)};
`;

const StyledInput = styled.input<StyledInputProps>`
  ${props => getMarginStyle(props)};
  ${props => getFlexStyle(props)};
  ${props => getSizeStyle(props)};
  && {
    ${props => getPaddingStyle(props)};
  }
`;

const StyledLine = styled.hr<StyledSizeProps & { $color?: string | number }>`
  background-color: ${props => props.$color || colors.gray01};
  align-self: stretch;
  margin: 0;
  border: 0;
  ${props => getSizeStyle(props)};
`;

export {
  Box,
  HBox,
  VBox,
  GridBox,
  Spacer,
  StyledInput,
  StyledForm,
  StyledLine,
  StyledHeadLine,
  StyledText,
  StyledButton
};
