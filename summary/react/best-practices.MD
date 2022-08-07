## 리액트 컴포넌트 구성 모범사례

- 컴포넌트는 기능별로 구분하고 작게 유지하자.
- 스타일은 JS로 관리하자.( scss 보다는 js in css방식이 프로젝트 규모에 맞춘 대응이 좋다. )
- linter를 사용하자.
- 주석은 필요한 곳에만 달자.
- 컴포넌트 이름은 대문자 사용.
- 컴포넌트 랜더링을 state관리와 분리( state가 없어도 단일 동작이 가능하게 유지 )
- 코드는 테스트 가능하게 유지
- 모든 관련 파일은 하나의 폴더에 관리
  - 이미지, 스타일, 테스트 코드, 서브 컴포넌트 포함
- 컴포넌트 속성에 defaultProps와 propTypes를 이용하자( js기준 )

## 리액트 훅 사용시 주의사항

- 성능문제에 직면하기 전까지는 useMemo, useCalback의 사용은 자제.
- re-render와 관련없는 React.memo, useMemo, useCallback 은 사용하지 않는게 좋다.
  - 참조 동일성과 관련없는 일반적인 연산은 훅을 사용하지 않아도 충분히 퍼포먼스가 좋다.

**참고**

- [how to useMemo,useCallback](https://www.developerway.com/posts/how-to-use-memo-use-callback)
