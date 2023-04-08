import styled from 'styled-components';
import {getStyleProps} from '@/ui/styled/core';

const Select = styled.select`
  ${props => props.theme.select};
  ${({theme, ...rest}) => getStyleProps(rest)};
`;

export default Select;
