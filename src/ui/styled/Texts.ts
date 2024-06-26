import styled from 'styled-components';
import colors from '../../styles/colors';
import { TypoProps } from './types/types';
import { getSpaceStyle, getTextStyle } from './core';

const TextBase = styled.p<TypoProps>`
  ${props => getTextStyle(props)};
  ${props => getSpaceStyle(props)};
`;

const Text = styled(TextBase)``;
Text.defaultProps = {
  $color: colors.gray7,
  $type: 'h8'
};

const HeadLine = styled(Text).attrs((props: TypoProps) => ({
  as: props.$type
}))``;

HeadLine.defaultProps = {
  $color: colors.gray8,
  $type: 'h1',
  bold: true
};

export { Text, HeadLine };
