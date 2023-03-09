/**
 * 케러셀 만들기
 * 대상구분없이 모든 아이템을 루프처리 할 수 있다.
 */
import React from 'react';
import useForceUpdate from '@/hooks/useForceUpdate';
import {PropsWithChildren, useMemo, useState, PointerEvent, useRef, useCallback} from 'react';
import styled from 'styled-components';

const defaultList = [
  {
    id: 1,
    description: 'test',
    url: 'https://via.placeholder.com/200x200'
  },
  {
    id: 2,
    description: 'test 2',
    url: 'https://via.placeholder.com/200x200'
  },
  {
    id: 3,
    description: 'test 3',
    url: 'https://via.placeholder.com/200x200'
  }
];

type CarouselItemData = typeof defaultList[0];

type CarouselStyleProps = {
  direction?: 'column' | 'row';
  duration?: number;
  width?: number;
  height?: number;
};

type CarouselContainerProps = Omit<CarouselStyleProps, 'duration'>;

type CarouselProps = {
  provider?: CarouselItemData[];
} & CarouselStyleProps;
const ViewPort = styled.div``;
const ListHolder = styled.ul``;
const ListItem = styled.li`
  padding: 0;
  margin: 0;
`;

const Container = styled.div.attrs<CarouselContainerProps>(props => ({
  direction: props.direction || 'row',
  width: props.width || 200,
  height: props.height || 200
}))<CarouselContainerProps>`
  position: relative;
  display: flex;
  ${ViewPort} {
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    overflow: hidden;
  }
  ${ListHolder} {
    display: flex;
    flex-direction: ${props => props.direction};
    list-style: none;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.12);
  }
`;

function Carousel({provider = defaultList}: PropsWithChildren<CarouselProps>) {
  const positionX = useRef(0);
  const forceUpdate = useForceUpdate();

  const transformX = {
    transform: `translateX(-${positionX.current * 200}px)`
  };

  const changePosition = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      let next =
        event.currentTarget.value === 'next' ? positionX.current + 1 : positionX.current - 1;
      if (next >= 0 && next <= 2) {
        positionX.current = next;
        forceUpdate();
      }
      if (next > 2) {
        positionX.current = 2;
      } else if (next < 0) {
        positionX.current = 0;
      }
    },
    [forceUpdate]
  );
  return (
    <Carousel.Container>
      <button value="prev" onPointerDown={changePosition}>
        이전
      </button>
      <Carousel.ViewPort>
        <Carousel.ListContainer style={transformX}>
          {provider.map(vo => (
            <Carousel.ListItem key={vo.id} data={vo} />
          ))}
        </Carousel.ListContainer>
      </Carousel.ViewPort>
      <button value="next" onPointerDown={changePosition}>
        다음
      </button>
    </Carousel.Container>
  );
}

const MemoedListItem = React.memo(function Foo({data}: {data: CarouselItemData}) {
  return (
    <ListItem key={data.id}>
      <img src={data.url} alt={data.description} />
    </ListItem>
  );
});

Carousel.Container = Container;
Carousel.ViewPort = ViewPort;
Carousel.ListContainer = ListHolder;
Carousel.ListItem = MemoedListItem;
export default Carousel;
