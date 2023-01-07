import {pickProps} from '@/helper/styleHelper';
import React, {PropsWithChildren, InputHTMLAttributes} from 'react';
import styled, {CSSProperties, StyledProps} from 'styled-components';
import {getStyleProps} from '../core';

type RadioStyleProps = {
  labelPosition?: string;
};
type RadioButtonProps = InputHTMLAttributes<HTMLInputElement> & RadioStyleProps;

const Input = styled.input.attrs({type: 'radio'})`
  ${props => props.style && getStyleProps(props.style)};
`;
const LabelText = styled.span`
  ${props => props.style && getStyleProps(props.style)};
`;
const RadioBase = styled.label`
  ${props => props.theme.radioButton};
`;

function RadioButton(props: PropsWithChildren<RadioButtonProps>) {
  const {children, style, labelPosition, ...rest} = props;

  const labelStyle = style && pickProps(style, ['color', 'fontWeight']);
  const inputStyle =
    style && pickProps(style, ['width', 'height', 'border', 'borderWidth', 'borderColor']);
  const labelText = <LabelText style={labelStyle}>{children}</LabelText>;
  const testIDProps = rest['data-test-id'] && {'data-test-id': rest['data-test-id']};
  delete rest['data-test-id'];
  return (
    <RadioBase {...testIDProps}>
      {labelPosition === 'left' && labelText}
      <Input name={rest.name} value={rest.value} style={inputStyle} />
      {labelPosition === 'right' && labelText}
    </RadioBase>
  );
}

RadioButton.defaultProps = {
  labelPosition: 'left'
};

export default RadioButton;
