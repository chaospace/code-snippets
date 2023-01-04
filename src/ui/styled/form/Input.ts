import styled, {CSSProperties, StyledProps} from 'styled-components';
import {getStyleProps} from '@/ui/styled/core';

const Input = styled.input.attrs({
  type: 'text'
})<StyledProps<CSSProperties>>`
  ${props => props.theme.input};
  ${({theme, ...rest}) => {
    return getStyleProps(rest);
  }};
`;

export default Input;
