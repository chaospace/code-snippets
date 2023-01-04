import styled, {StyledProps, CSSProperties} from 'styled-components';
import {getStyleProps} from '../core';

const Input = styled.input.attrs({type: 'checkbox'})`
  position: absolute;
  clip: rect(0, 0, 0, 0);
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const CheckMark = styled.span`
  position: relative;
  display: inline-flex;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: #333333;
`;

const CheckBoxBase = styled.label<StyledProps<CSSProperties>>`
  position: relative;
  display: flex;
  ${props => props.theme.checkbox};
  ${({theme, ...rest}) => getStyleProps(rest)};
  ${CheckMark} {
    &::after {
      position: absolute;
      content: '';
      width: 6px;
      height: 6px;
      border: 2px solid;
      border-radius: 0;
      border-width: 0 3px 3px 0;
      border-color: white;
    }
  }
  ${Input}:checked ~ ${CheckMark}::after {
    border-color: red;
  }
`;

export default CheckBoxBase;
