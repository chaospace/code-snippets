import styled from 'styled-components';
import {ContainerProps, FlexContainerProps, GridContainerProps} from './types/types';
import {
  getAlignStyle,
  getBorderStyle,
  getColorStyle,
  getDisplayStyle,
  getFlexDirectionStyle,
  getFlexStyle,
  getGridStyle,
  getOverFlowStyle,
  getPointerEventsStyle,
  getPositionStyle,
  getSizeStyle,
  getSpaceStyle,
  getZIndexStyle
} from './core';

const ContainerBase = styled.div<ContainerProps>`
  ${props => props.display && getDisplayStyle(props.display)};
  ${props => getPositionStyle(props.position ?? 'static')};
  ${props => getZIndexStyle(props)};
  ${props => getColorStyle(props)};
  ${props => getSizeStyle(props)};
  ${props => getSpaceStyle(props)};
  ${props => getOverFlowStyle(props)};
  ${props => getBorderStyle(props)};
  ${props => getPointerEventsStyle(props)};
`;

const Box = styled(ContainerBase).attrs((props: FlexContainerProps) => {
  return {...props, display: 'flex'};
})`
  ${props => getFlexDirectionStyle(props.flexDirection ?? 'row')};
  ${props => getFlexStyle(props)}
  ${props => getAlignStyle(props)}
`;
const HBox = styled(Box).attrs({flexDirection: 'row'})``;
const VBox = styled(Box).attrs({flexDirection: 'column'})``;

const GridBox = styled(ContainerBase).attrs((props: GridContainerProps) => ({
  ...props,
  display: 'grid'
}))`
  ${props => getGridStyle(props)};
`;

export {VBox, HBox, GridBox};
