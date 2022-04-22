// styled component 요소 모음
import React, {ComponentProps, ElementType, JSXElementConstructor} from 'react';
import {css, StyledComponent} from 'styled-components';
import {InferReturn, TFunc} from '../../../types/types';
import TypoGraphyStyleType, {TypoGraphyStyles} from './typo';
type PropsOf<T> = T extends React.ComponentType<infer P> ? P : never;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// styled컴포넌트 속성을 가진 리액트컴포넌트 속성타입 정의를 위한 타입.
type StyledPropsWithProps<InitialProps, Element extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> = 'div'> = PropsOf<
  StyledComponent<
    ComponentProps<Element>,
    any,
    InitialProps & {
      as?: ElementType;
      children?: React.ReactNode;
      className?: string;
    },
    never
  >
>;

type AlignDirection = 'column' | 'row';

// 엘리먼트 자식 요소 flex설정
type AlignItems = 'baseline' | 'center' | 'flex-start' | 'flex-end';

// 엘리먼트 자신의 flex설정
type AlignSelf = 'center' | 'start' | 'end' | 'normal' | 'stretch';

// justify-content 메인 축
// align 교차축
// 엘리먼트 content그룹에 정렬 flex-warp을 사용하고 아이템행이 2줄 이상일 때 동작
type AlignContents = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-evenly' | 'space-around';

type StyledPointerEvents = {
  pointerEvents?: 'auto' | 'none';
};

type StyledFlexDirectionProps = {
  flexDirection?: AlignDirection;
};

type StyledMarginProps = {
  mx?: number | string;
  ml?: number | string;
  mr?: number | string;
  my?: number | string;
  mt?: number | string;
  mb?: number | string;
  m?: string | string[] | number | number[];
};

type StyledPaddingProps = {
  px?: number | string;
  pl?: number | string;
  pr?: number | string;
  py?: number | string;
  pt?: number | string;
  pb?: number | string;
  p?: string | string[] | number | number[];
};

type StyledTextProps = {
  $style?: TypoGraphyStyleType;
  $size?: number;
  $color?: string;
  bgColor?: string;
  align?: string;
  letterSpacing?: string;
  lineHeight?: number;
  bold?: boolean;
};

type StyledBorderProps = {
  borderColor?: string | number;
  borderWidth?: number | string;
  borderType?: string;
  borderRadius?: number | string;
};

type StyledAlignProps = {
  alignContent?: AlignContents;
  alignItems?: AlignItems;
  alignSelf?: AlignSelf;
  justifyContent?: AlignContents;
  justifyItems?: AlignItems;
  justifySelf?: AlignSelf;
  gap?: number | string;
};

type StyledDisplayProps = {
  $display?: string;
};

type StyledContainerProps = {
  position?: string;
  boxShadow?: boolean;
  bgColor?: string;
};

type StyledOverFlowProps = {
  $overflowY?: boolean;
  $overflowX?: boolean;
  $overflow?: boolean;
};

type StyledGridProps = {
  columnCount?: string;
  rowCount?: string;
  columnGap?: string | number;
  rowGap?: string | number;
  gap?: string | number;
};

type StyledZIndexProps = {
  zIndex?: number | string;
};

type StyledFlexProps = StyledSizeProps & {
  flexBasis?: number | string;
  flexGrow?: number | string;
  flexWrap?: number | string;
  flexShrink?: number | string;
};

type StyledSizeProps = {
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
};

type StyledInputProps = StyledFlexProps & StyledSizeProps & StyledMarginProps & StyledPaddingProps;

const wrapArray = (values: string | number | string[] | number[]) => {
  return Array.isArray(values) ? values : [values];
};

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
  return css`
    ${() => overFlowCSS({$overflow, $overflowX, $overflowY})}
  `;
}

/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
const styleValueFormmater = (values: string | number | string[] | number[], suffix = undefined) => {
  const cloneValues = wrapArray(values).map(v => validateStyleValue(v.toString(), suffix));
  function sum(acc = '', v: string) {
    acc += `${v} `;
    return acc;
  }
  return cloneValues.reduce<string>(sum, '').trimEnd();
};
/* eslint-enabled no-return-assign */
/* eslint-enabled no-param-reassign */

const marginLeftCSS = (value: string) => `margin-left:${value};`;
const marginRightCSS = (value: string) => `margin-right:${value};`;
const marginHorizonCSS = (value: string) => `${marginLeftCSS(value)}
    ${marginRightCSS(value)}`;

const marginTopCSS = (value: string) => `margin-top:${value};`;
const marginBottomCSS = (value: string) => `margin-bottom: ${value};`;
const marginVerticalCSS = (value: string) => `${marginTopCSS(value)}
    ${marginBottomCSS(value)}`;
const marginCSS = (value: string) => {
  return `margin:${value};`;
};

const paddingLeftCSS = (value: string) => `padding-left:${value};`;
const paddingRightCSS = (value: string) => `padding-right:${value};`;
const paddingHorizonCSS = (value: string) => `${paddingLeftCSS(value)}
    ${paddingRightCSS(value)}`;

const paddingTopCSS = (value: string) => `padding-top:${value};`;
const paddingBottomCSS = (value: string) => `padding-bottom: ${value};`;
const paddingVerticalCSS = (value: string) => `${paddingTopCSS(value)}
    ${paddingBottomCSS(value)}`;
const paddingCSS = (value: string) => {
  return `padding:${value};`;
};

const setStyleValue = (key: string, value: string) => `${key}:${value}`;
const validateStyleValue = (value: string, suffix = 'px') => {
  return isNaN(Number(value)) ? value.toString() : `${value}${suffix}`;
};

const executeStyleSetter = <Func extends TFunc>(func: Func, ...rest: any[]): InferReturn<Func> | undefined => {
  const [key, v, suffix] = rest.length > 1 ? rest : [undefined, ...rest];

  if (v) {
    const param = styleValueFormmater(v, suffix);
    return key ? func(key, param) : func(param);
  }
  return undefined;
};

const curriedStyleSetter = <T extends unknown[]>(...rest: T) => executeStyleSetter(setStyleValue, ...rest);

function getDefaultTypoStyle(key: TypoGraphyStyleType) {
  const info = TypoGraphyStyles[key];
  return css`
    font-style: normal;
    font-size: ${info.size};
    letter-spacing: ${info.letterSpacing};
    line-height: ${info.lineHeight};
  `;
}

function getDisplayStyle(props: StyledDisplayProps) {
  return css`
    display: ${props.$display};
  `;
}

function getSuffix(value: string | number) {
  const units = ['px', '%', 'em'];
  const hasSuffix = units.some(unit => value.toString().indexOf(unit) > -1);
  return hasSuffix ? value : `${value}px`;
}

function getBorderStyle(props: StyledBorderProps) {
  let styles = '';
  if (props.borderWidth || props.borderType || props.borderColor) {
    styles = `border: ${props.borderWidth || 1}px ${props.borderType || 'solid'} ${props.borderColor || 'white'};`;
  }
  if (props.borderRadius) {
    styles += `border-radius: ${getSuffix(props.borderRadius)};`;
  }
  return styles
    ? css`
        ${styles}
      `
    : undefined;
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
  return css`
    ${() => curriedStyleSetter('pointer-events', props.pointerEvents, '')};
  `;
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

function getTextStyle(props: StyledTextProps) {
  const {align, $size, $style, letterSpacing, lineHeight} = props;
  return css<StyledTextProps>`
    color: ${() => props.$color || 'inherit'};
    background-color: ${() => props.bgColor || 'inherit'};
    font-weight: ${() => (props.bold ? 'bold' : 'normal')};
    ${() => getDefaultTypoStyle($style || 'p4')};
    ${() => curriedStyleSetter('text-align', align)};
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
  return css`
    flex-direction: ${props.flexDirection || 'column'};
  `;
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
    ${() => curriedStyleSetter('grid-template-columns', props.columnCount)};
    ${() => curriedStyleSetter('grid-template-rows', props.rowCount)};
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

function getZIndexStyle(props: StyledZIndexProps) {
  return css<StyledZIndexProps>`
    ${() => curriedStyleSetter('z-index', props.zIndex, '')};
  `;
}

type StyledButtonProps = StyledMarginProps & StyledPaddingProps & StyledTextProps;
type StyledSpaceProps = StyledMarginProps & StyledPaddingProps;
type StyledLayoutProps = StyledDisplayProps &
  StyledAlignProps &
  StyledContainerProps &
  StyledSizeProps &
  StyledSpaceProps &
  StyledFlexProps &
  StyledBorderProps &
  StyledOverFlowProps &
  StyledZIndexProps &
  StyledFlexDirectionProps &
  StyledPointerEvents;

type StyledTypoProps = StyledDisplayProps & StyledTextProps & StyledSpaceProps & StyledBorderProps;

type StyledGridLayoutProps = StyledContainerProps & StyledGridProps & StyledSpaceProps;

export type {
  AlignSelf,
  AlignContents,
  AlignItems,
  StyledFlexDirectionProps,
  StyledMarginProps,
  StyledLayoutProps,
  StyledGridLayoutProps,
  StyledTypoProps,
  StyledButtonProps,
  StyledInputProps,
  StyledSizeProps,
  StyledFlexProps
};

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
  getFlexDirectionStyle as getDirectionStyle,
  getTypoStyleWithOutLineHeight
};
