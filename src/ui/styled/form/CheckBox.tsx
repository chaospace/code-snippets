import React, {PropsWithChildren, InputHTMLAttributes} from 'react';
import styled, {CSSProperties} from 'styled-components';
import {pickProps} from '@/helper/styleHelper';
import {getStyleProps} from '../core';

type CheckBoxProps = InputHTMLAttributes<HTMLInputElement> & {
  checkColor?: string;
};

const Input = styled.input``;
const CheckMark = styled.i<Pick<CSSProperties, 'backgroundColor'>>`
  && {
    ${props => getStyleProps(props)}
  }
`;
const Label = styled.span`
  margin-top: 2px;
  && {
    ${props => getStyleProps(props)}
  }
`;
const Container = styled.label<Pick<CheckBoxProps, 'checkColor'>>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 0;
  align-items: center;
  cursor: pointer;
  ${props => props.theme.checkbox};
  && {
    ${props => getStyleProps(props)}
  }
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
    <CheckBox.Container {...containerStyle} checkColor={checkColor}>
      <CheckBox.Label {...labelStyle}>{children}</CheckBox.Label>
      <CheckBox.Input type="checkbox" {...rest} />
      <CheckBox.CheckMark {...checkMarkStyle} />
    </CheckBox.Container>
  );
}

CheckBox.Container = Container;
CheckBox.Label = Label;
CheckBox.Input = Input;
CheckBox.CheckMark = CheckMark;
CheckBox.defalutProps = {
  fontWeight: 'normal'
};
export default CheckBox;
