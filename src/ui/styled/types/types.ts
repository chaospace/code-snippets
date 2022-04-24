// styled component 요소 모음
import React, {ComponentProps, ElementType, JSXElementConstructor} from 'react';
import {StyledComponent} from 'styled-components';
import TypoGraphyType from './typo';

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

type DisplayPostions = 'static' | 'sticky' | 'absolute' | 'relative' | 'fixed';

type PointerEventProps = {
  pointerEvent?: 'auto' | 'none';
};

type FlexDirectionProps = {
  flexDirection?: AlignDirection;
};

type ColorProps = {
  $color?: string;
  bgColor?: string;
};

type MarginProps = {
  mx?: number | string;
  ml?: number | string;
  mr?: number | string;
  my?: number | string;
  mt?: number | string;
  mb?: number | string;
  m?: string | string[] | number | number[];
};

type PaddingProps = {
  px?: number | string;
  pl?: number | string;
  pr?: number | string;
  py?: number | string;
  pt?: number | string;
  pb?: number | string;
  p?: string | string[] | number | number[];
};

type TextProps = {
  $type?: TypoGraphyType;
  size?: number;
  align?: string;
  letterSpacing?: string;
  lineHeight?: number;
  bold?: boolean;
  $color?: string;
};

type BorderProps = {
  borderColor?: string | number;
  borderWidth?: number | string;
  borderType?: string;
  borderRadius?: number | string;
};

type FlexAlignProps = {
  alignContent?: AlignContents;
  alignItems?: AlignItems;
  alignSelf?: AlignSelf;
  justifyContent?: AlignContents;
  justifyItems?: AlignItems;
  justifySelf?: AlignSelf;
  gap?: number | string;
};

type DisplayProps = {
  display?: string;
};

type PositionProps = {
  position?: DisplayPostions;
};

type OverFlowProps = {
  overflowY?: boolean;
  overflowX?: boolean;
  overflow?: boolean;
};

type GridProps = {
  templateColumns?: string;
  templateRows?: string;
  columns?: string;
  rows?: string;
  columnGap?: string | number;
  rowGap?: string | number;
  autoRows?: string;
  autoColumns?: string;
  gap?: string | number;
};

type ZIndexProps = {
  zIndex?: number | string;
};

type FlexProps = {
  flexBasis?: number | string;
  flexGrow?: number | string;
  flexWrap?: number | string;
  flexShrink?: number | string;
};

type DisplaySizeProps = {
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
};

type SpaceProps = MarginProps & PaddingProps;
type ButtonProps = SpaceProps & TextProps;

type InputProps = FlexProps & DisplaySizeProps & MarginProps & PaddingProps;

type ContainerProps = PositionProps &
  DisplayProps &
  DisplaySizeProps &
  OverFlowProps &
  ColorProps &
  SpaceProps &
  BorderProps &
  ZIndexProps &
  PointerEventProps;
type FlexContainerProps = ContainerProps & FlexDirectionProps & FlexProps & FlexAlignProps;
type GridContainerProps = ContainerProps & GridProps;

type TypoProps = TextProps & SpaceProps;

export type {
  AlignDirection,
  DisplayPostions,
  AlignSelf,
  AlignContents,
  AlignItems,
  FlexDirectionProps,
  MarginProps,
  TypoProps,
  ButtonProps,
  InputProps,
  DisplaySizeProps,
  FlexProps,
  SpaceProps,
  ZIndexProps,
  GridProps,
  OverFlowProps,
  DisplayProps,
  FlexAlignProps,
  BorderProps,
  TextProps,
  PaddingProps,
  PointerEventProps,
  StyledPropsWithProps,
  ColorProps,
  ContainerProps,
  FlexContainerProps,
  GridContainerProps
};
