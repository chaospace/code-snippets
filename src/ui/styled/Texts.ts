import styled from 'styled-components';
import colors from '../colors';
import {TypoProps} from './types/types';
import {getSpaceStyle, getTextStyle} from './core';

const TextBase = styled.p<TypoProps>`
  ${props => getTextStyle(props)};
  ${props => getSpaceStyle(props)};
`;

const Text = styled(TextBase).attrs((props: TypoProps) => ({
  color: colors.gray07,
  type: props.type || 'h8'
}))``;

const HeadLine = styled(Text).attrs((props: TypoProps) => ({
  bold: true,
  color: colors.gray08,
  type: props.type || 'h1',
  as: props.type
}))``;

export {Text, HeadLine};
