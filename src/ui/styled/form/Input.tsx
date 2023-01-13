import React, {InputHTMLAttributes, PropsWithChildren, ReactElement, ReactNode} from 'react';
import styled, {CSSProperties} from 'styled-components';
import {getStyleProps} from '@/ui/styled/core';
import {createPortal} from 'react-dom';
import {pickProps} from '@/helper/styleHelper';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  append?: ReactNode;
  prepend?: ReactNode;
  feedbackMessage?: string;
  feedbackPortalElement?: HTMLElement | undefined;
};

const InputGroup = styled.div<
  Pick<CSSProperties, 'flexDirection' | 'color' | 'fontSize' | 'border' | 'borderColor'>
>`
  position: relative;
  display: flex;
  border-color: gray;
  flex-direction: ${props => props.style?.flexDirection || 'column'};
  gap: 8px;

  && {
    ${props => getStyleProps(props)}
  }
`;

const InputBase = styled.input<Pick<CSSProperties, 'borderRadius'>>`
  font-size: inherit;
  outline: none;
  border-width: 1px;
  border-color: inherit;
  border-style: solid;
  padding: 0.5em 1em;
  border-radius: 0;
  background-color: white;
  width: 100%;
  z-index: 1;
  &:focus {
    border-color: #2196f3;
    outline: 1px solid #2196f3;
  }

  &:read-only,
  &:disabled {
    color: gray;
    background-color: #eee;
    border-color: #ccc;
    outline: 1px solid #eee;
    pointer-events: none;
  }

  &.invalid {
    border-color: red;
    background-color: #ffcbcb;
    &:focus {
      outline: 1px solid red;
    }
  }
  && {
    ${props => getStyleProps(props)}
  }
`;

const InputLabel = styled.label``;

const InputGroupWrapper = styled.div`
  position: relative;
  display: flex;
  border-radius: 0.5em;
  border-color: inherit;
  align-items: stretch;
  background-color: gainsboro;
  && {
    ${props => getStyleProps(props)}
  }
`;

const InputGroupDecorator = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0 1em;
  background-color: transparent;
  border-radius: 0;
  white-space: nowrap;
  border: 1px solid;
  border-color: inherit;

  &.prepend-item {
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
    margin-right: -1px;
  }

  &.append-item {
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    margin-left: -1px;
  }
`;

const InputFeedback = styled.span`
  font-size: 0.8em;
  color: red;
`;

function Input(props: PropsWithChildren<InputProps>) {
  const {label, name, id, append, prepend, feedbackPortalElement, style, className, ...rest} =
    props;
  const inputID = id || name || `input_${new Date().getTime()}`;
  const hasError = (className && className.includes('invalid')) || false;
  const clearBorderRadius = append || prepend || false;
  let inputStyle = {};
  if (!clearBorderRadius) {
    inputStyle = {borderRadius: 'inherit'};
  }

  const groupStyle =
    style && pickProps(style, ['color', 'fontSize', 'borderColor', 'border', 'flexDirection']);
  const wrapperStyle = style && pickProps(style, ['backgroundColor']);
  console.log('rest', rest);
  return (
    <Input.Container {...groupStyle}>
      <Input.Label htmlFor={inputID}>{label}</Input.Label>
      <Input.GroupWrapper {...wrapperStyle}>
        {prepend && (
          <Input.GroupItemDecorator className="prepend-item">{prepend}</Input.GroupItemDecorator>
        )}
        <InputBase className={className} name={name} id={inputID} {...inputStyle} {...rest} />
        {append && (
          <Input.GroupItemDecorator className="append-item">{append}</Input.GroupItemDecorator>
        )}
      </Input.GroupWrapper>
      {hasError
        ? (feedbackPortalElement &&
            createPortal(
              <Input.Feedback>error-message</Input.Feedback>,
              feedbackPortalElement
            )) || <Input.Feedback>error-message</Input.Feedback>
        : null}
    </Input.Container>
  );
}

Input.Container = InputGroup;
Input.Label = InputLabel;
Input.GroupWrapper = InputGroupWrapper;
Input.GroupItemDecorator = InputGroupDecorator;
Input.Feedback = InputFeedback;

export default Input;
