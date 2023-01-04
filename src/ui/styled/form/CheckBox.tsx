import React, {PropsWithChildren} from 'react';
import styled, {StyledProps, CSSProperties} from 'styled-components';
import {getStyleProps} from '../core';

const Input = styled.input.attrs({type: 'checkbox'})`
  position: absolute;
  clip: rect(0, 0, 0, 0);
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const CheckMark = styled.i`
  position: relative;
  display: inline-flex;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: #333;
  margin-left: 8px;
`;

const CheckBoxBase = styled.label<StyledProps<CSSProperties>>`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  ${props => props.theme.checkbox};
  ${({theme, ...rest}) => getStyleProps(rest)};
  ${CheckMark} {
    &::after {
      position: absolute;
      content: '';
      top: 1px;
      left: 6px;
      width: 8px;
      height: 14px;
      border-style: solid;
      border-radius: 0;
      border-width: 0px 3px 2px 0px;
      border-color: transparent;
      transform: rotate(45deg);
    }
  }
  ${Input}:checked ~ ${CheckMark}::after {
    border-color: #fffc03;
  }
`;

function CheckBox(props: PropsWithChildren<StyledProps<CSSProperties>>) {
  return (
    <CheckBoxBase>
      체크박스
      <Input />
      <CheckMark />
    </CheckBoxBase>
  );
}

export default CheckBox;
