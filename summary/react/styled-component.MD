# 스타일드 컴포넌트 주요문법

- auto-prefixing
- attrs
  ```javascript
    const StyledInput = styled.input.attrs({
        type:'text',
        placeholder: props => props.placeholder :'default'
    })`
        padding:6px 12px;
    `;
  ```
- 기존 css와도 사용가능

  ```javascript
      const ButtonBase = styled.button.attrs({
          clsssName:`btn btn-primary btn-${props => props.size || 'medium' }`
      })``;

      <Button size="small">
  ```

- withComponent( as )

  ```javascript
  const ButtonBase = styled.button.attrs({
    clsssName: `btn btn-primary btn-${props => props.size || 'medium'}`
  })``;

  const LinkButton = ButtonBase.withComponent('a');
  ```

- 중첩 스타일, 미디어 쿼리 지원

  ```javascript
  const StyledBox = styled.div`
    widht: 200px;
    height: 200px;
    ::before {
      content: '';
    }
    ::after {
      content: '';
    }
    @media (max-width: 700px) {
      background-color: red;
    }
  `;
  ```

- 부모 엘리먼트 선택자

  ```javascript
  // 일반적인 자식요소 svg접근 방법
  const Link = styled.a`
    display: flex;
    align-items: center;
    &:hover svg {
    }
  `;

  // 자식요소에서 부모요소 참조를 통한 스타일 적용
  const Icon = styled.svg`
    width: 24px;
    height: 24px;
    ${Link}:hover & {
      fill: red;
    }
  `;
  ```

- theme context 제공

  ```javascript
  import styled, {ThemeProvider} from 'styled-component';

  const theme = {
    color: 'red',
    size: '12px'
  };

  const Button = styled.button`
    color:${props => props.color};
    font-size:${props=>props.size};
  `;

  <ThemeProvider theme={theme}>
    <Button />
    <Button theme={{color:'blue'}}>
  </ThemeProvider>
  ```

- compositions & mixin 제공

  ```javascript
  import css from 'styled-component';
  const borderStyle = css`
    border: 1px solid red;
  `;
  const borderStyleMixin = (color = 'white', width = 1) => {
    return `border: ${width}px solid ${color};`;
  };

  const StyledComp = styled.div`
    // 선언된 스타일을 이용한 조합
    ${borderStyle};
    // 함수를 이용한 조합
    ${borderStyleMixin('red')}
  `;
  ```

- 기존 스타일 오버라이드

  ```javascript
  // &선택자를 이용한 방법
  const OverrideStyle = styled(StyledButton)`
    &&& {
      color: red;
      font-weight: bold;
    }
  `;

  // 인라인 스타일을 이용하는 방법
  const InlineOverrideStyle = styled(StyledButton)`
    &[style] {
      font-weight: bold;
      color: blue;
    }
  `;
  ```

# 컴포넌트 테마 관리 방법

테마를 관리하는 방법은 다양하겠지만 잘게 제공되는 기본 ThemeProvider를 좀더 효율적으로 사용하고 싶다면 상위에 하나의 Context를 추가해 관리하면 좋음.

```javascript
  //테마와 상관없는 공통요소 선언 예시는 컬러 정보만 테마로 관리
  const base = {
        space:{
            0,
            2,
            4,
            8,
            12,
            16,
            20
        },
        fontSizes:{
            12,
            14,
            16,
            18,
            20,
            22,
            24,
            26,
            28,
            30
        }
    }

    const dark = {
        background:'black',
        text:'white'
    }

    const light = {
        text:'black',
        background:'white'
    }

    const themes = {
        light,
        dark
    }

    const ThemePreferenceContext = React.createContext();

    const App = () => {
        const [theme, setTheme] = useState('light');
        const currentTheme = {...base, colors:themes[theme]};

        return (
            <ThemePreferenceContext.Provider value={{theme, setTheme}}>
                <ThemeProvider theme={currentTheme}>
                    {
                        /* children components */
                    }
                </ThemeProvider>
            </ThemePreferenceContext.Provider>
        )
    }
```
