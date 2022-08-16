# 리액트 Element, children, parents 와 re-renders의 관계

함수형 리액트는 쓴다면 훅과 re-render의 동작이 예상처럼 동작하지 않는 경우가 있는데 이에 대한 실마리를 제공하는 글.

## "children" 속성의 몇 가지 의문

onMouseMove를 통해 갱신되는 상태를 가진 컴포넌트가 있다고 가정

<details>
    <summary>코드보기</summary>

```typescript
const MovingComponent = () => {
  const [state, setState] = useState({x: 100, y: 100});

  return (
    <div
      onMouseMove={e => setState({x: e.clientX - 20, y: e.clientY - 20})}
      style={{left: state.x, top: state.y}}
    >
      <ChildComponent />
    </div>
  );
};
```

</details>

위와 같은 상황에서 마우스를 움직이면

1. state값이 갱신
2. MovingComponent re-render발생
3. ChildComponent re-render 발생
4. ChildComponent에 무거운 연산이 있다면 마우스를 움직일 때마다 화면 퍼포먼스에 문제가 발생할 확률이 증가( 최적화 필요 )

## 해결방법

1.  memo를 이용한 ChildComponent 메모제이션
2.  ChildComponent를 MovingCompnoent에서 제외하고 children속성으로 전달

<details>
  <summary>2번 샘플코드보기</summary>

```typescript
const MovingComponent = ({children}) => {
  const [state, setState] = useState({x: 100, y: 100});

  return (
    <div
      onMouseMove={e => setState({x: e.clientX - 20, y: e.clientY - 20})}
      style={{left: state.x, top: state.y}}
    >
      // 기존 ChildCompnent자리를 children으로 대체
      {children}
    </div>
  );
};

// ChildCompnent전달을 위한 래퍼객체 선언
const SomeOutSideComponent = () => {
  return (
    <MovingComponent>
      <ChildCompnent />
    </MovingComponent>
  );
};
```

위와 같은 방식을 적용하면 ChildComponent는 SomeSideComponent에서 관리하는 속성이 되고 MovingComponent의 상태변경에 영향을 받지 않는다.

</details>

해당 방법으로 자식 요소의 불필요한 re-render를 방지하는 건 좋은데 평소 children을 사용하는 방법을 고려할 때 아래와 같은 내용을 이해하는게 좋다.

- ### 부모에서 children속성으로 넘긴다고 왜 re-render가 발생하지 않지?

  > MovingComponent의 코드를 보면 div에 마우스 좌표가 스타일로 반영되고 매번 갱신이 일어나는데 왜 children은 re-render가 되지 않을까?

- ### children을 함수로 사용하면 어떻게 될까?

  > 화면 구성 시 하위 컴포넌트와 데이터 공유를 위해 종종 사용하는 방법으로, 이 경우 ChildComponent는 MovingComponent에 re-render발생 시 ( 부모 상태와 무관 해도 ) 같이 re-render가 발생한다.

    <details>
        <summary>샘플코드</summary>

  ```typescript

  const MovingComponent = ({ children }) => {

    return (
      <div ...// callbacks same as before
      >
        // 자식요소를 render함수를 통해 구성
        // 상태와는 무관한 데이터 전달
        {children({ data: 'something' })}
      </div>
    );
  };

  const SomeOutsideComponent = () => {
    return (
      <MovingComponent>
      // ChildComponent는 MovingComponent에 상태변경 시 re-render
      // 전달되는 data를 사용하지 않음.
      {() => <ChildComponent />}
      </MovingComponent>
    )
  }

  ```

  </details>

- ### React.momo를 이용한 방법은 뭘까?

  > SomeOutsideComponent에 상태를 추가하고 불필요한 re-render를 막기 위해 MovingComponent를 memo하면 일반적인 경우 re-render가 방지 되지만 ChildComponent를 전달할 경우 re-render가 발생한다.

    <details>
        <summary>샘플코드</summary>

  ```typescript
  // wrapping MovingComponent in memo to prevent it from re-rendering
  const MovingComponentMemo = React.memo(MovingComponent);
  const SomeOutsideComponent = () => {
  // trigger re-renders here with state
  const [state, setState] = useState();

  return (
    <MovingComponent>
      <!-- 자식요소는 SomeOutsideComponent에 상태변경에 따라 re-render됨 -->
      <ChildComponent />
    </MovingComponent>
  )
  ```

  위 상황에서는 MovingComponent를 memo하는 게 아니라 ChildComponent를 memo하면 원하는 동작을 한다.

  ```typescript
    const ChildComponentMemo = React.memo(ChildComponent);

    const SomeOutsideComponent = () => {
      const [state, setState] = useState();

      return (
        <MovingComponent>
          <!--MovingComponent을 memo하지 않아도 자식요소는 re-render하지 않음 -->
          <ChildComponentMemo />
        </MovingComponent>
      )
    }
  ```

</details>

- ### useCallback을 이용해서는 해결할 수 없나?

  > children을 함수로 전달 시 useCallback을 이용하면 re-render를 방지할 거라 생각할 수 있지만 항상 re-render가 발생한다.

  <details>  
    <summary>샘플코드</summary>

  ```typescript
  const SomeOutsideComponent = () => {

    const [state, setState] = useState();

    // useCallback을 이용한 렌더함수 기억
    const child = useCallback(() => {
      return <ChildComponent />;
    }, []);

    return (
      <MovingComponent>
        <!-- 랜더함수를 memo했지만 별 도움이 안됨 -->
        {child}
      </MovingComponent>
    )
  };
  ```

  </details>

위에 나열한 동작을 설명하려면 리액트의 children에 대한 정확히 이해가 선행되면 도움이 된다.

## 리액트 children속성의 정체

쉽게 말하면 props에 하나며 react제공하는 편의문법으로 사용하는 경우도 많아 혼란 스러울 수도 있음.

### children을 사용하는 다양한 방법

- 1. 구조분해 할당을 이용한 사용

  ```typescript
  const Parent = ({children}) => {
    return <>{children}</>;
  };

  <Parent>
    <Child />
  </Parent>;
  ```

- 2.  구조분해 할당을 이용한 사용

  ```typescript
  const Parent = props => {
    return <>{props.children}</>;
  };
  ```

  1.2의 사용을 명확히 하면 children속성에 전달하는 것이다.

```typescript
<Parent children={<Child />} />
```

다른 속성과 마찬가지로 children을 넘기는 방식에 따라 Element, Function, Component를 사용할 수 있고 여기서 자식요소의 랜더링 패턴이 나옵니다.

```typescript
// children속성을 이용한 자식 렌더링 방법

// as prop
<Parent children={() => <Child />} />

// "normal" syntax
<Parent>
  {() => <Child />}
</Parent>

// 위와 같이 함수가 전달되면 내부에서는 이렇게 사용
const Parent = ({ children }) => {
  return <>{children()}</>
}

// 이렇게도 사용가능 물론 사용하지 않겠지만
<Parent children={Child} />;

const Parent = ({ children: Child }) => {
  return <>{<Child />}</>;
};
```

[원문](https://www.developerway.com/posts/react-elements-children-parents)
