# 리액트 테스팅 라이브러리 요약

@testing-library패키지는 사용자 중심 방식으로 UI컴포넌트를 테스트하는데 도움.

Jest, Mocha, JSDOM 또는 실제 브라우저 같은 DOM API를 제공하는 환경에서 모두 작동

## 테스트 코드 작성 시 주의할 점

테스트 중인 컴포넌트의 내부와 세부 구현정보를 테스트 하지 않도록 권장(가능은 하지만).

아래와 같은 세부적인 테스트 내용은 자제하는게 좋음.

- 컴포넌트의 내부 상태
- 컴포넌트의 내부 메서드
- 컴포넌트 생명주기
- 자식 컴포넌트

## 가이드 원칙

웹 페이지가 사용되는 방식과 매우 유사한 테스트를 작성하도록 권장하는 메서드와 유틸을 제공.

제공되는 유틸들은 아래와 같은 가이드 원칙에 기반.

1. 랜더링되는 컴포넌트의 경우 인스턴스가 아닌 DOM노드를 처리해야 한다.
2. 일반적으로 사용자가 사용하는 방식으로 컴포넌트를 테스트하는데 유용하다.
3. 구현 및 API는 간단하고 유연하다.

# 주요 API

    - Quries ( 페이지에서 엘리먼트를 찾는 방법 제공 )
        -ByRole
        -ByLabelText
        -ByPlaceholderText
        -ByText
        -ByDisplayValue
        -ByAltText
        -ByTitle
        -ByTestid

    - User Actions
        - Firing Events ( 사용해도 되지만 대부분 @testing-library/user-event 권장)
          - fireEvent
          - 이벤트 핸들러에 Jest Mock Function과 함께 사용됨
        - Async Methods
          - await
          - awaitFor
          - waitForElementToBeRemoved
        - Appearance and Disappearance
        - Considerations for fireEvent
        - Using Fake Timers
