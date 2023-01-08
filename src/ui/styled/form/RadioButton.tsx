import React, {PropsWithChildren, InputHTMLAttributes} from 'react';
import {pickProps} from '@/helper/styleHelper';
import styled from 'styled-components';
import {getStyleProps} from '../core';

type RadioStyleProps = {
  labelPosition?: string;
  type: 'radio';
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
  const {children, style, name, value, disabled, labelPosition, ...rest} = props;

  const labelStyle = style && pickProps(style, ['color', 'fontWeight']);
  const containerStyle = style && pickProps(style, ['fontSize']);
  const inputStyle =
    style &&
    pickProps(style, [
      'width',
      'height',
      'backgroundColor',
      'border',
      'borderWidth',
      'borderColor'
    ]);
  const labelText = <LabelText style={labelStyle}>{children}</LabelText>;
  const testIDProps = rest['data-test-id'] && {'data-test-id': rest['data-test-id']};
  delete rest['data-test-id'];
  return (
    <RadioBase style={containerStyle} {...testIDProps}>
      {labelPosition === 'left' && labelText}
      <Input name={name} value={value} disabled={disabled} style={inputStyle} {...rest} />
      {labelPosition === 'right' && labelText}
    </RadioBase>
  );
}

RadioButton.defaultProps = {
  labelPosition: 'left'
};

export default RadioButton;
