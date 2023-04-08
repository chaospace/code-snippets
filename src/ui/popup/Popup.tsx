import React, {PropsWithChildren} from 'react';
import styled from 'styled-components';

const BackScreen = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

type ContainerProps = {
  open?: boolean;
  align?: 'center' | 'end' | 'stretch';
};

const Container = styled.div.attrs<ContainerProps>(({open = false, align = 'center'}) => ({
  open,
  align
}))<ContainerProps>`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  user-select: none;
  justify-content: center;
  align-items: ${({align}) => align};
  ${({open}) =>
    open && {
      transition: 'visiblity 0s lienar',
      visibility: 'visible'
    }} || ({
    transition:'visiblity 0s lienar 0.5s',
    visibility: 'hidden'
  })}
  ${BackScreen} {

  }
`;

function Popup(props: PropsWithChildren<{}>) {
  return <Popup.Container></Popup.Container>;
}

Popup.Container = Container;

export default Popup;
