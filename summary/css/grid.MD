# 그리드

아주 강력한 기능을 담은 표준이라 플랙스박스(FlexBox)와 결합하여 이전에는 불가능한 레이아웃을 만들 수 있다.

## 그리드컨테이너

요소에 <mark>dispay:grid</mark> 또는 <mark>dispay:inline-grid</mark>를 선언하여 만들고 해당 요소의 모든 자식요소는 그리드아이템이 된다.

```html
<div class="wrapper">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
</div>
```

wrapper를 그리드 컨테이너로 설정

```css
.wrapper {
  display: grid;
}
```

결과
![실행결과](./images/grid-container.png '그리드컨테이너')

## 그리드트랙

그리드의 행과 열은 <mark>grid-template-columns</mark> 및 <mark>grid-template-rows</mark> 로 정의할 수 있다.

grid-template-columns을 이용해 세로 열 스타일 지정 방법  
단위는 자유롭게 사용가능

```css
.wrapper {
  display: grid;
  grid-template-columns: 200px 200px 200px;
}
```

```css
.wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
}
```

```css
.wrapper {
  display: grid;
  grid-template-columns: 500px 1fr 2fr;
}
```

## fr

트랙은 모든 종류의 길이 단위를 써서 정의할 수 있습니다.  
<mark>fr</mark> 단위는 그리드 컨테이너에 남아 있는 사용 가능한 공간의 일정 비율을 나타냅니다.  
다음에 정의된 그리드에서는 남아 있는 공간에 따라 확장 및 축소되는 같은 너비의 트랙 3개를 생성합니다.

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```

결과
![실행결과](./images/grid-fr-unit.png 'fr단위')

## repeat()을 이용한 트랙 나열

많은 트랙을 포함하는 커다란 그리드는 repeat() 표기법을 사용하여 트랙의 전체 또는 일부분을 반복해서 나열해 줄 수 있습니다.

앞에서 사용한 트랙 스타일을 repeat을 이용해 다음과 같이 나타낼 수 있습니다.

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

반복 표기법은 트랙의 목록 중 일부분에만 사용할 수도 있습니다

```css
.wrapper {
  display: grid;
  grid-template-columns: 20px repeat(6, 1fr) 20px;
}
```

반복 표기법은 트랙의 목록도 함께 나열해서 지정할 수 있는데, 이렇게 하면 트랙의 반복 패턴을 생성해서 사용하게 됩니다.  
다음 예제는 그리드가 10개의 트랙으로 구성되어 있으며, 1fr 크기의 트랙 다음에 2fr 크기 트랙이 위치하고, 이 형태가 5회 반복됩니다.

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr 2fr);
}
```

## 잠재적 그리고 명시적 그리드

- 명시적 그리드
  - <mark>grid-template-columns</mark> 및 <mark>grid-template-rows</mark>로 직접 정의한 행과 열로 이루어진 그리드를 말합니다.
- 잠재적 그리드
  - 명시적으로 정의된 그리드 밖에 무언가를 배치할 땐, 늘어난 콘텐츠 양 때문에 더 많은 그리드 트랙이 필요하고, 그리드는 잠재적 그리드에 새로운 행과 열을 만들게 됩니다.  
    이렇게 해서 생긴 트랙은 기본적으로 크기가 자동으로 정해지는데, 트랙 내부의 내용물에 따라 크기가 조정됩니다.
  - <mark>grid-auto-columns</mark> 및 <mark>grid-template-rows</mark>로 지정해 줄 수 도 있다.

<mark>grid-template-rows</mark>를 통해 생성된 트랙의 높이가 200px이 되도록 설정

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
}
```

## 트랙 크기 조정과 minmax()

명시적 그리드를 설정하거나 자동으로 생성된 행이나 열의 크기를 정의할 때, 트랙의 최소 크기를 정해도 나중에 추가되는 콘텐츠에 맞게 늘어나도록 하고 싶을 때 사용하는 속성.

자동으로 생성된 행의 높이는 최소 100픽셀이고 최댓값은 auto입니다. auto를 지정하면 크기는 콘텐츠의 크기를 살피게 되는데, 가로 행에 있는 가장 높은 셀의 크기만큼 자동으로 늘어나서 부족한 공간을 메꿔줍니다.

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto);
}
```

## 그리드 라인

그리드를 정의할 때 라인이 아닌 그리드 트랙을 정의한다는 점을 명심해야 합니다. 그러면 그리드는 아이템을 배치할 때 쓸 수 있게 번호가 매겨진 라인을 자동으로 제공합니다. 아래 그림처럼, 그리드가 세 개의 세로 열(Column)과 두 개의 가로 행(Row)으로 이루어져 있다면, 네 개의 Grid Line이 Column으로 자리 잡게 됩니다.

![실행결과](./images/grid-line.png '그리드 라인')

라인에 번호증감순서는 언어에 따라 왼쪽 오른쪽이 정해지며 라인에 번호 대신 이름을 지정해 사용할 수도 있습니다.

## 라인을 이용한 아이템 배치

라인에 기반을 둔 배치 방법 중 가장 쉬운 것은 <mark>grid-row-start</mark>, <mark>grid-row-end</mark>,
<mark>grid-column-start</mark>,<mark>grid-column-end</mark> 를 사용하는 것이며 다음과 같다.

```html
<div class="wrapper">
  <div class="box1">One</div>
  <div class="box2">Two</div>
  <div class="box3">Three</div>
  <div class="box4">Four</div>
  <div class="box5">Five</div>
</div>
```

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;
}

.box1 {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
}

.box2 {
  grid-column-start: 1;
  grid-row-start: 3;
  grid-row-end: 5;
}
```

![실행결과](./images/grid-line-layout.png '그리드 라인')

**참고문서**

- [모질라 그리드 문서](https://developer.mozilla.org/ko/docs/web/css/css_grid_layout/basic_concepts_of_grid_layout)
