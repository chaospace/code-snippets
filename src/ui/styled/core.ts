import {css} from 'styled-components';
import {InferReturn, TFunc} from '../../types/types';
import TypoGraphyStyleType, {TypoGraphyStyles} from './types/typo';
import {
  StyledOverFlowProps,
  StyledDisplayProps,
  StyledBorderProps,
  StyledFlexProps,
  StyledPointerEvents,
  StyledMarginProps,
  StyledPaddingProps,
  StyledSpaceProps,
  StyledTextProps,
  StyledFlexDirectionProps,
  StyledAlignProps,
  StyledGridProps,
  StyledSizeProps,
  StyledZIndexProps,
  StyledColorProps
} from './types/types';
import toArray from '@/utils/toArray';

const units = ['px', '%', 'vh', 'vw', 'em'];

/**
 * value뒤에 스타일 단위포함 여부 판단
 * @param value
 * @returns
 */
function hasSuffix(value: string | number) {
  return units.some(unit => value.toString().indexOf(unit) > -1);
}

const overFlowCSS = (props: StyledOverFlowProps) => {
  let style = '';
  if (props.$overflowX || props.$overflowY) {
    style += `overflow : hidden;`;
    style += props.$overflowX ? `overflow-x:auto` : `overflow-y:auto`;
  } else if (props.$overflow) {
    style += `overflow:hidden`;
  }
  return style;
};
function getOverFlowStyle(props: StyledOverFlowProps) {
  const {$overflow, $overflowX, $overflowY} = props;
  return overFlowCSS({$overflow, $overflowX, $overflowY});
}

/**
 * 스타일 value타입에 따른 보완처리
 * @param value  적용 값
 * @param suffix 단위 기본값 px
 * @returns
 */
const measureValue = (value: string | number, suffix = 'px') => {
  return hasSuffix(value) ? value : `${value}${suffix}`;
};

/**
 * margin, padding값 css문법 처리
 * px="0 30" => 0px 30px
 * m={[0 20 20 10]} => 0px 20px 20px 10px
 * @param values 스타일 적용 값
 * @param suffix 단위 기본값 px
 * @returns
 */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
const styleValueFormmater = (values: string | number | string[] | number[], suffix = undefined) => {
  const cloneValues = toArray(values).map(v => measureValue(v, suffix));
  function sum(acc = '', v: string) {
    acc += `${v} `;
    return acc;
  }
  return cloneValues.reduce<string>(sum, '').trimEnd();
};

const setStyleValue = (key: string, value: string) => `${key}:${value}`;
const executeStyleSetter = <Func extends TFunc>(func: Func, ...rest: any[]): InferReturn<Func> | undefined => {
  const [key, v, suffix] = rest.length > 1 ? rest : [undefined, ...rest];
  if (v) {
    const param = styleValueFormmater(v, suffix);
    return key ? func(key, param) : func(param);
  }
  return undefined;
};
const curriedStyleSetter = <T extends unknown[]>(...rest: T) => executeStyleSetter(setStyleValue, ...rest);
// margin, padding 스타일 반환 함수모음
/* eslint-enabled no-return-assign */
/* eslint-enabled no-param-reassign */
const marginLeftCSS = (value: string) => `margin-left:${value};`;
const marginRightCSS = (value: string) => `margin-right:${value};`;
const marginHorizonCSS = (value: string) => `${marginLeftCSS(value)}${marginRightCSS(value)}`;
const marginTopCSS = (value: string) => `margin-top:${value};`;
const marginBottomCSS = (value: string) => `margin-bottom: ${value};`;
const marginVerticalCSS = (value: string) => `${marginTopCSS(value)} ${marginBottomCSS(value)}`;
const marginCSS = (value: string) => `margin:${value};`;
const paddingLeftCSS = (value: string) => `padding-left:${value};`;
const paddingRightCSS = (value: string) => `padding-right:${value};`;
const paddingHorizonCSS = (value: string) => `${paddingLeftCSS(value)}${paddingRightCSS(value)}`;
const paddingTopCSS = (value: string) => `padding-top:${value};`;
const paddingBottomCSS = (value: string) => `padding-bottom: ${value};`;
const paddingVerticalCSS = (value: string) => `${paddingTopCSS(value)}${paddingBottomCSS(value)}`;
const paddingCSS = (value: string) => `padding:${value};`;

function getDefaultTypoStyle(key: TypoGraphyStyleType) {
  const info = TypoGraphyStyles[key];
  return css`
    font-size: ${info.size};
    letter-spacing: ${info.letterSpacing};
    line-height: ${info.lineHeight};
  `;
}
function getDisplayStyle(props: StyledDisplayProps) {
  return `display: ${props.$display}`;
}

function getBorderStyle(props: StyledBorderProps) {
  let styles = ``;
  if (props.borderWidth || props.borderType || props.borderColor) {
    styles = `border: ${props.borderWidth || 1}px ${props.borderType || 'solid'} ${props.borderColor || 'white'};`;
  }
  if (props.borderRadius) {
    styles += `border-radius: ${measureValue(props.borderRadius)};`;
  }
  return styles || undefined;
}

function getFlexStyle(props: StyledFlexProps) {
  const {flexGrow, flexBasis, flexShrink} = props;
  return css<StyledFlexProps>`
    ${() => curriedStyleSetter('flex-grow', flexGrow, '')};
    ${() => curriedStyleSetter('flex-shrink', flexShrink, '')};
    ${() => curriedStyleSetter('flex-basis', flexBasis)};
  `;
}
function getPointerEventsStyle(props: StyledPointerEvents) {
  return curriedStyleSetter('pointer-events', props.pointerEvents, '');
}

function getMarginStyle(props: StyledMarginProps) {
  const {ml, mr, mx, mt, mb, my, m} = props;
  return css<StyledMarginProps>`
    ${() => executeStyleSetter(marginLeftCSS, ml)};
    ${() => executeStyleSetter(marginRightCSS, mr)};
    ${() => executeStyleSetter(marginHorizonCSS, mx)};
    ${() => executeStyleSetter(marginTopCSS, mt)};
    ${() => executeStyleSetter(marginBottomCSS, mb)};
    ${() => executeStyleSetter(marginVerticalCSS, my)};
    ${() => executeStyleSetter(marginCSS, m)};
  `;
}
function getPaddingStyle(props: StyledPaddingProps) {
  const {pl, pr, px, pt, pb, py, p} = props;
  return css<StyledPaddingProps>`
    ${() => executeStyleSetter(paddingLeftCSS, pl)};
    ${() => executeStyleSetter(paddingRightCSS, pr)};
    ${() => executeStyleSetter(paddingHorizonCSS, px)};
    ${() => executeStyleSetter(paddingTopCSS, pt)};
    ${() => executeStyleSetter(paddingBottomCSS, pb)};
    ${() => executeStyleSetter(paddingVerticalCSS, py)};
    ${() => executeStyleSetter(paddingCSS, p)};
  `;
}

function getSpaceStyle(props: StyledSpaceProps) {
  return css<StyledSpaceProps>`
    ${() => getMarginStyle(props)};
    ${() => getPaddingStyle(props)};
  `;
}

function getColorStyle({$color, bgColor}: StyledColorProps) {
  return css`
    ${() => $color && `color:${$color};`};
    ${() => bgColor && `background-color:${bgColor};`};
  `;
}

function getFontWeight(bold?: boolean) {
  return css`
    font-weight: ${bold ? 'bold' : 'normal'};
  `;
}

function getTextStyle(props: StyledTextProps) {
  const {align, $size, $style, bold, letterSpacing, lineHeight} = props;
  return css<StyledTextProps>`
    ${() => getDefaultTypoStyle($style || 'p4')};
    ${() => curriedStyleSetter('text-align', align)};
    ${() => getColorStyle(props)};
    ${() => getFontWeight(bold)};
    ${() => curriedStyleSetter('font-size', $size)};
    ${() => curriedStyleSetter('letter-spacing', letterSpacing)};
    ${() => curriedStyleSetter('line-height', lineHeight)};
  `;
}
function getTypoStyleWithOutLineHeight(key: TypoGraphyStyleType) {
  const info = TypoGraphyStyles[key];
  return css`
    font-size: ${info.size};
    letter-spacing: ${info.letterSpacing};
  `;
}

function getFlexDirectionStyle(props: StyledFlexDirectionProps) {
  return `flex-direction: ${props.flexDirection || 'column'}`;
}

function getAlignStyle(props: StyledAlignProps) {
  return css<StyledAlignProps>`
    ${() => setStyleValue('align-items', props.alignItems || 'normal')};
    ${() => curriedStyleSetter('gap', props.gap)};
    ${() => curriedStyleSetter('align-self', props.alignSelf)};
    ${() => curriedStyleSetter('align-content', props.alignContent)};
    ${() => curriedStyleSetter('justify-items', props.justifyItems)};
    ${() => curriedStyleSetter('justify-content', props.justifyContent)};
    ${() => curriedStyleSetter('jusitify-self', props.justifySelf)};
  `;
}
function getGridStyle(props: StyledGridProps) {
  return css`
    ${() => curriedStyleSetter('grid-template-columns', props.columns)};
    ${() => curriedStyleSetter('grid-template-rows', props.rows)};
    ${() => curriedStyleSetter('row-gap', props.rowGap)};
    ${() => curriedStyleSetter('column-gap', props.columnGap)};
    ${() => curriedStyleSetter('gap', props.gap)};
  `;
}
function getSizeStyle(props: StyledSizeProps) {
  return css<StyledSizeProps>`
    ${() => curriedStyleSetter('width', props.width)};
    ${() => curriedStyleSetter('height', props.height)};
    ${() => curriedStyleSetter('min-width', props.minWidth)};
    ${() => curriedStyleSetter('min-height', props.minHeight)};
    ${() => curriedStyleSetter('max-width', props.maxWidth)};
    ${() => curriedStyleSetter('max-height', props.maxHeight)};
  `;
}
function getZIndexStyle({zIndex}: StyledZIndexProps) {
  return curriedStyleSetter('z-index', zIndex, '');
}

export {
  getDisplayStyle,
  getFlexStyle,
  getOverFlowStyle,
  getGridStyle,
  getAlignStyle,
  getSpaceStyle,
  getMarginStyle,
  getSizeStyle,
  getPaddingStyle,
  getTextStyle,
  getBorderStyle,
  getDefaultTypoStyle,
  getPointerEventsStyle,
  getZIndexStyle,
  getFlexDirectionStyle,
  getTypoStyleWithOutLineHeight
};
