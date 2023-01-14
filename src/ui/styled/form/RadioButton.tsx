import React, {PropsWithChildren, InputHTMLAttributes} from 'react';
import {pickProps} from '@/helper/styleHelper';
import styled, {CSSProperties} from 'styled-components';
import {getStyleProps} from '../core';
import {colors} from '@/theme';

type RadioStyleProps = {
  labelPosition?: 'left' | 'right';
};
type RadioButtonProps = InputHTMLAttributes<HTMLInputElement> & RadioStyleProps;

const Input = styled.input<CSSProperties>`
  appearance: none;
  margin: 0 4px;
  padding: 0;
  width: 1.4em;
  height: 1.4em;
  border-radius: 50%;
  border: 2px solid;
  border-color: gray;
  background-color: white;
  transition: 0.3s ease-out;
  transition-property: border;
  &:disabled {
    background-color: ${colors.disabled};
    border-color: ${colors.disabledDarken};
  }

  &:disabled ~ span {
    color: ${colors.disabled};
  }

  &:checked {
    border-width: 0.4em;
    background-color: #ffcbcb;
  }
  && {
    border-color: ${props => props.borderColor};
    &:checked {
      background-color: ${props => props.backgroundColor};
    }
  }
`;

const Container = styled.label<CSSProperties>`
  position: relative;
  display: flex;
  align-items: end;
  font-size: 16px;
  && {
    ${props => getStyleProps({fontSize: props.fontSize})}
  }
`;

const Label = styled.span`
  ${props => getStyleProps(props)};
`;

function RadioButton(props: PropsWithChildren<RadioButtonProps>) {
  const {children, style, labelPosition, ...rest} = props;

  const containerStyle = style && pickProps(style, ['fontSize']);
  const labelStyle = style && pickProps(style, ['color', 'fontWeight']);
  const inputStyle =
    style && pickProps(style, ['backgroundColor', 'border', 'borderWidth', 'borderColor']);
  const LabelText = <RadioButton.Label {...labelStyle}>{children}</RadioButton.Label>;
  const testIDProps = rest['data-test-id'] && {'data-test-id': rest['data-test-id']};
  delete rest['data-test-id'];
  return (
    <RadioButton.Container {...containerStyle} {...testIDProps}>
      {labelPosition === 'left' && LabelText}
      <RadioButton.Input type="radio" {...inputStyle} {...rest} />
      {labelPosition === 'right' && LabelText}
    </RadioButton.Container>
  );
}

RadioButton.Container = Container;
RadioButton.Input = Input;
RadioButton.Label = Label;

RadioButton.defaultProps = {
  labelPosition: 'left'
};

export default RadioButton;
