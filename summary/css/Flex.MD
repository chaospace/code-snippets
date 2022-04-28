# Flex

## align-items 와 align-content 차이

**공통점**

- 둘다 cross-axis 기준 정렬.

**차이점**

- align-items : flex-line을 기준으로 아이템을 정렬
- align-content : flex-line을 정렬

> align-content는 nowrap인 경우 사용하는 의미가 없음. nowrap은 강제로 한 줄에 그리기 때문에 flex-line이 하나 뿐이기 때문.
