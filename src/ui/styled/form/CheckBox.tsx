import React, {PropsWithChildren} from 'react';
import styled, {StyledProps, CSSProperties} from 'styled-components';
import {getStyleProps} from '../core';

type CheckBoxProps = StyledProps<{
  checkBoxSize?: string;
  border?: string;
  borderRadius?: string;
  checkColor?: string;
  backgroundColor?: string;
  fontWeight?: string;
  color?: string;
}>;

const Input = styled.input.attrs({type: 'checkbox'})``;
const CheckMark = styled.i<CheckBoxProps>`
  ${({checkBoxSize}) => checkBoxSize && getStyleProps({width: checkBoxSize, height: checkBoxSize})};
  && {
    ${({checkBoxSize, ...rest}) => getStyleProps(rest)};
  }
`;
const CheckLabel = styled.span<CSSProperties>`
  margin-top: 2px;
  ${props => getStyleProps(props)};
`;
const CheckBoxBase = styled.label<CheckBoxProps>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 0;
  align-items: center;
  cursor: pointer;
  ${props => props.theme.checkbox};
  ${Input}:checked ~ ${CheckMark}::after {
    ${props => props.checkColor && getStyleProps({borderColor: props.checkColor})};
  }
`;

function CheckBox(props: PropsWithChildren<CheckBoxProps>) {
  const {
    children,
    checkBoxSize,
    checkColor,
    fontWeight,
    backgroundColor,
    border,
    borderRadius,
    color
  } = props;
  return (
    <CheckBoxBase {...{checkColor}}>
      <CheckLabel {...{fontWeight, color}}>{children}</CheckLabel>
      <Input />
      <CheckMark {...{checkBoxSize, backgroundColor, border, borderRadius}} />
    </CheckBoxBase>
  );
}
CheckBox.defalutProps = {
  fontWeight: 'normal'
};
export default CheckBox;
