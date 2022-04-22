// styled component 요소 모음
import React, {ComponentProps, ElementType, JSXElementConstructor} from 'react';
import {StyledComponent} from 'styled-components';
import TypoGraphyStyleType from './typo';

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
  StyledFlexProps,
  StyledSpaceProps,
  StyledZIndexProps,
  StyledGridProps,
  StyledOverFlowProps,
  StyledDisplayProps,
  StyledAlignProps,
  StyledBorderProps,
  StyledTextProps,
  StyledPaddingProps,
  StyledPointerEvents,
  StyledPropsWithProps
};
