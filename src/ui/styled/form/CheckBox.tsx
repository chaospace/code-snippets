import React, {PropsWithChildren} from 'react';
import styled, {StyledProps, CSSProperties} from 'styled-components';
import {getStyleProps} from '../core';

type CheckBoxProps = CSSProperties & {size?: string; border?: string; iconColor?: string};

const Input = styled.input.attrs({type: 'checkbox'})``;
const CheckMark = styled.i<StyledProps<CheckBoxProps>>`
  ${({size}) => size && getStyleProps({width: size, height: size})};
  && {
    ${({size, ...rest}) => getStyleProps(rest)};
  }
`;
const CheckLabel = styled.span<StyledProps<CSSProperties>>`
  margin-top: 2px;
  ${props => getStyleProps(props)};
`;
const CheckBoxBase = styled.label<StyledProps<CheckBoxProps>>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  cursor: pointer;
  ${props => props.theme.checkbox};
  ${Input}:checked ~ ${CheckMark}::after {
    ${props => props.iconColor && getStyleProps({borderColor: props.iconColor})};
  }
`;

function CheckBox(props: PropsWithChildren<StyledProps<CheckBoxProps>>) {
  const {children, size, iconColor, fontWeight, backgroundColor, border, color, ...rest} = props;
  return (
    <CheckBoxBase {...{iconColor}}>
      <CheckLabel {...{fontWeight, color}}>{children}</CheckLabel>
      <Input />
      <CheckMark {...{size, backgroundColor, border}} />
    </CheckBoxBase>
  );
}

export default CheckBox;
