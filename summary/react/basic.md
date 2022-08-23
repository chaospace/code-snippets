# 리액트 자습서 정리

모든 React컴포넌트는 자신의 Props를 다룰 때 반드시 순수 함수처럼 동작해야 합니다.  
동적 UI구성을 위해 <code>"state"</code>라는 개념을 사용합니다.

# State를 올바르게 사용하기

- 직접 State를 수정하지 마세요.
- State업데이트는 비동기적일 수도 있습니다.
  - 비동기적인 업데이트를 위해 state를 직접사용하기 보다 함수를 통해 인자로 사용해야 됩니다.

```javascript
    //wrong
    this.setStates({
        this.state.counter + this.props.increment
    });

    //Correct
    this.setState(({state, props})=>{
        return {
            counter:state + props.increment
        }
    })
```

## 데이터는 아래로 흐릅니다.

- state는 소유한 컴포넌트 이외에는 알수도 없고 접근할 수 없습니다.
- state는 자식 컴포넌트에 props로 전달할 수 있습니다.

# 이벤트처리하기

React엘리먼트에서 이벤트를 처리하는 방식은 DOM엘리먼트에서 이벤트를 처리하는 방식과 유사하지만 몇 가지 문법 차이가 있습니다.

- React의 이벤트는 소문자 대신 캐멀케이스를 사용합니다.
- JSX를 사용해 문자열이 아닌 함수로 이벤트 핸들러를 전달합니다.

```typescript
// 일반 JS
<button onclick="onClickHandler">
    클릭
</button>
// JSX
<button onClick={onClickHandler}>
    클릭
</button>
```

# 리스트와 Key

- <code>map()</code>함수 내부에 있는 엘리먼트에 key를 넣어 주는게 좋습니다.
- key는 형제 사이에서만 고유한 값이면 됩니다.( 전체에서 고유할 필요 없음 )

# 리액트로 생각하기

- UI를 계층 구조로 나누기
- 정적인 버튼 만들기
  - state(컴포넌트 안에서 관리 즉 컴포넌트 인스턴스의 변수 처럼 사용) vs props( 함수 파라미터 )
- UI state에 대한 최소한의 표현 찾아내기

  - 컴포넌트에 불필요한 상태를 최대한 줄이고 아래 체크 항목을 생각해서 state를 구성
    - 부모로부터 props를 통해 전달 가능하면 -> no state
    - 시간이 지나도 변하지 않으면 -> no state
    - 컴포넌트 안에 다른 state 혹은 props로 계산 가능하면 -> no state

- state가 어디에 있어야 할 지 찾기

  - 리액트에 데이터는 단방향이며 데이터는 위에서 아래로 흐른다는 것은 기억하세요
    - 최근 상태관리 패키지를 이용하면 이는 조금 다를 수 있지만 가능한 지키는게 코드 재사용성은 좋은 듯.

- 역방향 데이터 흐름 추가하기
  - 하위 컴포넌트에서 state를 변경해야 하는 경우 setState를 props로 전달해 처리.
