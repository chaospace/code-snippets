# Context

일반적인 React애플리케이션에서 데이터는 위에서 아래로 props를 통해 전달되지만,
애플리케이션 안의 여러 컴포넌트들에게 전달해야 하는 props의 경우 이 과정이 번거로울 수 있음.

<code>context</code>를 사용하면 트리 단계마다 props를 넘겨주지 않아도 많은 컴포넌트가 값을 공유할 수 있습니다.

## 언제 context를 써야 할까.

context는 컴포넌트 트리 안에서 전역데이터를 공유할 수 있도록 고안된 방법.

- 로그인 유저 정보
- 테마 정보

## context를 사용하기 전 고려사항

중첩된 컴포넌트에 props를 전달하지 않고 편리하게 정보를 공유할 수 있지만 이것은 해당 context에 종속적인 컴포넌트가 되는 것으로 판단을 잘해서 사용해야 한다.

**context를 사용전에 합성을 통해 해결할 수 있는지 먼저 고민해 보는것이 좋다**

```typescript
// 중첩된 Page컴포넌트는 Avata컴포넌트를 위해 user속성을 하위 컴포넌트에 계속 전달해야 됨.
// user속성을 모두 넘기는 방식이 조금 버겨워 보임
<Page user={user} avatarSize={avatarSize} />
// ... 그 아래에 ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... 그 아래에 ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... 그 아래에 ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>
```

위와 같은 상황에서 합성을 이용하면 편리하게 전달이 가능

```typescript
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// 이제 이렇게 쓸 수 있습니다.
<Page user={user} avatarSize={avatarSize} />
// ... 그 아래에 ...
<PageLayout userLink={...} />
// ... 그 아래에 ...
<NavigationBar userLink={...} />
// ... 그 아래에 ...
{props.userLink}
```

### API

### React.createContext

```typescript
const MyContext = React.createContext(defaultValue);
```

### Context.Provider

```typescript
<MyContext.Provider value={/*어떤 값*/}>
```

Context오브젝트에 포함된 Provider는 context에 변경을 구독하는 컴포넌트에 알리는 역할을 합니다.  
Provider하위 consumer(.contextType와 useContext을 포함한)로의 전파는 <code>shouldComponentUpdate</code>메서드가 적용되지 않으므로, 상위 컴포넌트가 업데이트를 건너 뛰어도 cunsumer가 업데이트 됩니다.

context의 변경여부는 <code>Object.is</code>를 통해 판단합니다.( [주의사항](https://ko.reactjs.org/docs/context.html#caveats) )

### Context.Consumer

context변화를 구독하는 React컴포넌트입니다.  
이 컴포넌트를 사용하면 <code>함수 컴포넌트안에서</code> Context를 구독할 수 있습니다.

- Context.Consumer의 자식은 함수여야 합니다.

```typescript
    <MyContext>
        {value => /* context값을 이용한 렌더링 */}
    </MyContext>
```

### Context.displayName

<code>displayName</code>속성을 이용해 이름을 설정할 수 있고 React개발자 도구를 통해 설정한 값을 볼수 있다.

```typescript
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" in DevTools
<MyContext.Consumer> // "MyDisplayName.Consumer" in DevTools

```

## 하위 컴포넌트에서 context업데이트 하기

컴포넌트 트리를 통해 context를 업데이트 해야 할 경우 context를 통해 메서드를 보내면 됩니다.

```typescript
// createContext에 보내는 기본값의 모양을
// 하위 컴포넌트가 받고 있는 매개변수 모양과 동일하게 만드는 것 잊지마세요!
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {}
});

// 하위 컴포넌트에서는 전달된 메서드를 통해 context를 업데이트
function ThemeTogglerButton() {
  // ThemeTogglerButton는 context로부터
  // theme 값과 함께 toggleTheme 매서드도 받고 있습니다.
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button onClick={toggleTheme} style={{backgroundColor: theme.background}}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}
```

## 여러 context구독하기

context변경 시 하위 컴포넌트 re-rendering이 발생하기 때문에 여러 context를 사용할 경우
변경을 최소화 하기 위해서는 context를 단계별로 구성하는게 좋다.

**context를 분리하기 전 같이 묶여서 사용할 수 있는 것은 하나의 context로 묶는 것이 좋다.**

```typescript
// context 초기값을 제공하는 App 컴포넌트
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }

// 여러 context의 값을 받는 컴포넌트
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```

## 에러경계( Error Boundaries )

> 에러 경계는 트리 내에서 하위에 존재하는 컴포넌트의 에러만 포착합니다.
> 렌더 시 일어나는 것을 포착하며 랜더와 관계없는 이벤트 핸들러에 에러는 기존 try/catch를 이용해야 됩니다.

UI의 일부분에 존재하는 자바스크립트 에러가 전체 애플리케이션을 중단시켜서는 안 됩니다.  
에러 경계는 **하위 컴포넌트 트리의 어디에서든 자바스크립트 에러를 기록하며 깨진 컴포넌트 트리 대신 폴백 UI를 보여주는 React컴포넌트 입니다.**

생명주기 메서드인 <code>static getDerivedStateFromError()</code>와 <code>componentDidCatch</code>중 하나(혹은 둘 다)를 정의하면 클래스 컴포넌트 자체가 에러 경계가 됩니다.

- 에러가 발생한 뒤에 폴백 UI를 렌더링 하려면 <code style="color:skyblue">static getDerivedStateFromError()</code>
- 에러 정보를 기록하려면 <code style="color:skyblue">componentDidCatch()</code>

```typescript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

사용 예시

```typescript
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

## Ref전달하기

일반적인 컴포넌트는 ref를 사용할 필요가 없지만 재사용을 위해 자주 사용되는 <code>말단 컴포넌트(Button, Input, ...etd)</code>는 포커스, 애니메이션 처리등을 위해 DOM에 접근할 필요가 있고 리액트는 ref전달을 위해 <code>React.forwardRef</code>를 사용합니다.

```typescript
const FancyButton = React.forwardRef((props, ref)=>{
    return (
        <button ref={ref}>
            {props.children}
        </button>
    )
})

// 이제 DOM버튼으로 ref를 직접 받을 수 있음
const ref = useRef();
<FancyButton ref={ref}>Click me!</button>
```

> 두 번째 ref인자는 React.forwardRef와 같이 호출된 컴포넌트에서만 생성됩니다.  
> ref전달은 DOM컴포넌트뿐 아니라, 클래스 인스턴스에도 전달할 수 있습니다.

### Ref를 사용해야 할 때

- 포커스, 텍스트 선택영역, 혹은 미디어의 재생을 관리할 때
- 애니메이션을 직접적으로 실행시킬 때
- 서드 파티 DOM라이브러리를 React와 같이 사용할 때

선언적으로 해결될 수 있는 문제에서는 ref사용을 지양.  
ex ) Dialog의 open, close메서드를 두는 대신 isOpen속성을 사용

### 콜백 ref

ref가 설정되고 해재되는 상황을 세세하게 다룰 수 있는 "콜백 ref"이라 불리는 ref를 설정하기 위한 또 다른 방법을 제공합니다.

```typescript
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // DOM API를 사용하여 text 타입의 input 엘리먼트를 포커스합니다.
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // 마운트 되었을 때 자동으로 text 타입의 input 엘리먼트를 포커스합니다.
    this.focusTextInput();
  }

  render() {
    // text 타입의 input 엘리먼트의 참조를 인스턴스의 프로퍼티
    // (예를 들어`this.textInput`)에 저장하기 위해 `ref` 콜백을 사용합니다.
    return (
      <div>
        <input type="text" ref={this.setTextInputRef} />
        <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
      </div>
    );
  }
}
```

## 콜백 ref에 관한 주의사항

ref콜백은 업데이트 과정 중에 처음에는 <code>null</code>로, 그 다음에 DOM엘리먼트로, 총 두번 호출되는데 이는 매 랜더링마다 ref콜백의 새 인스턴스가 생성되는 과정에서 React가 이전 ref를 제거하는 과정으로 많은 경우 이런 현상은 문제가 되지 않습니다.

## Fragment

DOM에 별도의 노드를 추가하지 않고 여러 자식을 그룹화 하는 방법.

> Fragment에 허용된 유일한 속성은 <code>key</code>입니다.

## Portals

부모 컴포넌트의 DOM계층 구조 바깥에 있는 DOM 노드로 자식을 렌더링하는 방법

```typescript
ReactDOM.createProtal(child, container);
```

포탈의 유스케이스는 부모 컴포넌트에 <code>overflow:hidden</code>이나 <code>z-index</code>가 있는 경우, 시각적으로 자식을 '튀어나와' 보여야 하는 경우 사용합니다.  
(ex : 다이얼로그, 호버카드, 툴팁 )

> portal을 이용할 경우 <code>키보드 포커스 관리</code>가 중요하며 <code>[WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/#dialog_modal)</code>에 따라 모든 모달 다이얼로그와 상호작용할 수 있는지 확인이 필요합니다.

## ES6없이 사용하는 React

es6없이 사용한다면 <code>create-react-class</code>모듈을 사용해야 합니다.

```typescript
//ES6 class의 API는 몇몇 차이점을 제외하고는 createReactClass()와 비슷합니다
var createReactClass = require('create-react-class');
var Greeting = createReactClass({
  render: function () {
    return <h1>Hello, {this.props.name}</h1>;
  }
});
```

## Stric 모드

- 안전하지 않은 생명주기를 사용하는 컴포넌트 발견
- 레거시 문자열 ref사용에 대한 경고
- 권장되지 않는 findDOMNode 사용에 대한 경고
- 예상치 못한 부작용 검사
- 레거시 context API 검사
