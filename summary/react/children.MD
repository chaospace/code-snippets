# 리액트 Element, children, parents 와 re-renders의 관계

함수형 리액트는 쓴다면 훅과 re-render의 동작이 예상처럼 동작하지 않는 경우가 있는데 이에 대한 실마리를 제공하는 글.

## "children" 속성의 몇 가지 의문

onMouseMove를 통해 갱신되는 상태를 가진 컴포넌트가 있다고 가정

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

<details>
    <summary>예상동작</summary>

1. state값이 갱신
2. MovingComponent re-render발생
3. ChildComponent re-render 발생
4. ChildComponent에 무거운 연산이 있다면 마우스를 움직일 때마다 화면 퍼포먼스에 문제가 발생할 확률이 증가( 최적화 필요 )

</details>

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
    <MovingComponentMemo>
      <!-- 자식요소는 SomeOutsideComponent에 상태변경에 따라 re-render됨 -->
      <ChildComponent />
    </MovingComponentMemo>
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

react제공하는 편의문법으로 사용하는 경우도 많아 혼란 스러울 수도 있지만 결국 props일 뿐이다.

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

// 일반적으로 사용하진 않지만 이렇게도 가능
<Parent children={Child} />;

const Parent = ({ children: Child }) => {
  return <>{<Child />}</>;
};
```

## children의 동작원리

children이 props의 하나라는 것을 알았다면 이제 children이 어떻게 동작하는지 이해가 필요.

**아래 코드가 하는 일은?**

```typescript
const child = <Child />;
```

<details>
  <summary>정답</summary>  
  종종 해당 코드를 시작으로 컴포넌트 라이프사이클이 동작한다 생각할 수 있지만 정답이 아니다.

> 앞에 <code><Child \/></code> 는 리액트의 "Element"를 나타내고, <code>React.createElement</code>의 syntax sugar로 결국 <code>object</code>를 반환한다

이제 아래코드를 보자

```typescript
const Parent = () => {
  // 여기에 child는 object상태일 뿐
  const child = <Child />;
  return <div />;
};

// 위 코드는 아래처럼 대체가 가능하다.
const Parent = () => {
  const child = React.createElement(Child, null, null);
};
```

결국 컴포넌트 함수에서 return이 일어나기 전에는 render가 일어나지 않고 object상태로 머물 뿐이다.

```typescript
const Parent = () => {
  const child = <Child />;
  // return을 만나 반환이 되야 비로소 render트리가 발생되고 element가 생김
  return <div>{child}</div>;
};
```

</details>

## Updating Elements

elements는 불변 객체로 이를 업데이트 하는 방법은 오직 re-render뿐이고 이때 re-created 된다.  
이를 코드로 보면 아래와 같다.

```typescript
const Parent = () => {
  // 자식 요소에 변경이 있으면 결국 객체는 re-created되고 이 표현은 부모요소의 re-render를 통해 확인가능
  const child = <Child />;

  return <div>{child}</div>;
};
```

리액트 관점에서 새로 생성된 Element는 같은 위치, 같은 타입으로 이전 컴포넌트를 새로운 데이터로 업데이트(re-render) 하면 됩니다.  
그렇다면 <code>React.memo</code>, <code>useMemo</code>를 감싼 컴포넌트의 동작을 이해할 수 있다.  
리액트 입장에서 정의된 객체가 <code>re-created 되지 않으면</code> 해당 객체 의 업데이트 하지않고 <code>Child를 re-render하지 않는다.</code>

더 자세한 내용을 이해하고 싶다면 아래 문서를 참고하면 좋다.

- [리액트 엘리먼트 렌더링](https://ko.reactjs.org/docs/rendering-elements.html)

- [React Components, Elements, and Instances](reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html#elements-describe-the-tree)
- [JSX없이 리액트 사용하기](https://ko.reactjs.org/docs/react-without-jsx.html)

[원문](https://www.developerway.com/posts/react-elements-children-parents)
