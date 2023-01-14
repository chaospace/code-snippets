import {adjustHexColor} from '@/helper/styleHelper';
import styled, {css, CSSProperties, StyledProps} from 'styled-components';
import {getStyleProps} from './core';

const Button = styled.button<StyledProps<CSSProperties>>`
  ${props => props.theme.button && css(props.theme.button)};
  ${({theme, ...rest}) => rest && getStyleProps(rest)};
  &:hover {
    background-color: ${({backgroundColor}) =>
      backgroundColor && adjustHexColor(backgroundColor, 20)};
  }
`;

Button.defaultProps = {};

export default Button;
