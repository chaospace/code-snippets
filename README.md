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
