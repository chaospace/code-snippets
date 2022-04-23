import styled from 'styled-components';
import colors from '../colors';
import {TypoProps} from './types/types';
import {getSpaceStyle, getTextStyle} from './core';

const Text = styled.p<TypoProps>`
  ${props => {
    props.color ||= colors.gray07;
    return getTextStyle(props);
  }};
  ${props => getSpaceStyle(props)};
`;

const Text14 = styled(Text).attrs({
  type: 'p14'
})``;

const Text16 = styled(Text).attrs({
  type: 'p16'
})``;

const Text18 = styled(Text).attrs({
  type: 'p18'
})``;

const Text20 = styled(Text).attrs({
  type: 'p20'
})``;

const Text24 = styled(Text).attrs({
  type: 'p24'
})``;

const Text32 = styled(Text).attrs({
  type: 'p32'
})``;

const HeadLine = styled(Text).attrs({
  bold: true,
  color: colors.gray08
})``;

export {Text, Text14, Text16, Text18, Text20, Text24, Text32, HeadLine};
