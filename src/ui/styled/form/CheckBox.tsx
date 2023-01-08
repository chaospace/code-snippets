import {pickProps} from '@/helper/styleHelper';
import React, {PropsWithChildren, InputHTMLAttributes} from 'react';
import styled, {StyledProps, CSSProperties} from 'styled-components';
import {getStyleProps} from '../core';

//HTMLProp
//HTMLInputElement
type CheckBoxProps = InputHTMLAttributes<HTMLInputElement> & {
  checkColor?: string;
  type: 'checkbox';
};
//   Pick<
//     CSSProperties,
//     'border' | 'borderRadius' | 'color' | 'backgroundColor' | 'fontWeight' | 'fontSize'
//   >;

const Input = styled.input.attrs({type: 'checkbox'})``;
const CheckMark = styled.i`
  ${props => props.style && getStyleProps(props.style)};
`;
const CheckLabel = styled.span`
  margin-top: 2px;
  ${props => props.style && getStyleProps(props.style)};
`;
const CheckBoxBase = styled.label<Pick<CheckBoxProps, 'checkColor'>>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 0;
  align-items: center;
  cursor: pointer;
  ${props => props.theme.checkbox};
  ${props => props.style && getStyleProps(props.style)};
  ${Input}:checked ~ ${CheckMark}::after {
    ${props => props.checkColor && getStyleProps({borderColor: props.checkColor})};
  }
`;

function CheckBox(props: PropsWithChildren<CheckBoxProps>) {
  const {children, checkColor, style, ...rest} = props;
  const containerStyle = style && pickProps(style, ['fontSize']);
  const labelStyle = style && pickProps(style, ['color', 'fontWeight']);
  const checkMarkStyle = style && pickProps(style, ['backgroundColor', 'border', 'borderRadius']);
  return (
    <CheckBoxBase style={containerStyle} checkColor={checkColor}>
      <CheckLabel style={labelStyle}>{children}</CheckLabel>
      <Input {...rest} />
      <CheckMark style={checkMarkStyle} />
    </CheckBoxBase>
  );
}
CheckBox.defalutProps = {
  fontWeight: 'normal'
};
export default CheckBox;
