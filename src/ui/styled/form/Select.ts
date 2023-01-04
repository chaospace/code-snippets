import styled, {CSSProperties, StyledProps} from 'styled-components';
import {getStyleProps} from '@/ui/styled/core';

const Select = styled.select<StyledProps<CSSProperties>>`
  ${props => props.theme.select};
  ${({theme, ...rest}) => getStyleProps(rest)};
`;

export default Select;
