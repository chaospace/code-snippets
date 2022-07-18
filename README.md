프로젝트를 하며 자주 사용될거 같은 코드조각을 정리해서 모아놓은 곳
폴더 구조는 사용 환경에 따라 정리가 필요할 수 있음.

```
+-- utils       // utils 함수 모음
+-- helper      // utils의 함수를 이용한 편의함수 제공 객체 or 모듈 모음
+-- hooks       // 자유 사용하는 hook 모음
+-- ui          // styled-component기반 ui 컴포넌트 베이스 모음 타입 고도화 필요

```

## webpack 주요 설정 정리

**eslint&prettier**

- yarn add -D eslint-config-prettier eslint-plugin-pretier
  - config-prettier : ESLint의 formatting 관련 설정 중 Prettier와 충돌하는 부분 비활성화.
  - plugin-prettier : Prettier에서 인식하는 코드상의 포맷 오류를 ESLint 오류로 출력
- yarn add -D eslint-plugin-react eslint-plugin-react-hooks

**react-fast-refresh**

- yarn add -D @pmmmwh/react-refresh-webpack-plugin react-refresh
- yarn add -D type-fest
  - typescript프로젝트일 경우 설치

<details>
<summary>webpack 적용 예시( wepback-dev-server )</summary>

```js
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devServer: {
    hot: true
  }
};
```

</details>

<details>
<summary>babel-loader 설정</summary>

```js
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean)
            }
          }
        ]
      }
    ]
  },
  plugins: [isDevelopment && new ReactRefreshWebpackPlugin()].filter(Boolean)
};
```

</details>

## react test library 정리

> 컴포넌트의 상태관리 및 구현을 위한 코드를 피하고. 동작에 중점을 둔 코드를 만드는게 지속적인 유지보수를 통해 관리하기 쉬운 테스트코드가 된다.

**세부구현 내용이란?**

- Internal state of a component
- Internal methods of a component
- Lifecycle methods of a component
- Child components

[기본적인 사용법](https://www.freecodecamp.org/news/8-simple-steps-to-start-testing-react-apps-using-react-testing-library-and-jest/#3-testing-events)

## typescript 타입처리 참고

[typescript 타입처리](https://catchts.com/validators)

## typescript 내용 정리

[조건부 타입](./summary/ts/ConditionalTypes.md)  
[타입추론](./summary/ts/TypeInference.md)

## css 내용 정리

[Grid](./summary/css/Grid.MD)  
[Flex](./summary/css/Flex.MD)

## react 내용 정리

[TESTING](./summary/react/test.MD)
