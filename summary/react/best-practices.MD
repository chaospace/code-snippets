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

## 리액트 훅 구성 유의사항.

- 엄청 복잡한 연산이 아닌 경우는 memo를 하지 않는게 초기 랜더링을 빠르게 유지하는 방법이다.
- 성능문제에 직면하기 전까지는 useMemo, useCalback의 사용은 자제.
- useMemo, useCallback은 메모화라는 기회비용이 들어가고 남발하게 되면 화면 초기화가 늦어지는 원인이 된다.
- useMemo, useCallback의 사용은 참조동일성 유지와 re-render방지를 위한 memo와 관련 있을 때만 하는게 좋다.
    <details>
      
    <summary> 샘플보기 </summary>

  평소 목록 리스트를 구성할 때 검색어에 해당하는 것만 표현해야 한다면 아래와 같이 코드를 작성했는데

  ```typescript
  // memo를 통한 검색된 배열 구성
  const start = performance.now();
  const filteredArray = useMemo(
    () => array.filter(item => item.indexOf(searchWord) > -1),
    [searchWord]
  );
  console.log('end', performance.now() - start);
  return filterdArray.map(item => {
    return <ListItem key={item.id}>{item.label}</ListItem>;
  });
  ```

  performance를 통해 배열구성 실행시간 확인해 보면 useMemo없이 사용하는 쪽이 더 빠르다.
  그리고 시간을 잡아먹는 건 변수계산이 아니라 돔을 구성하는 랜더 처리에서 가장 많은 시간이 소비되는 것이 확인된다.

  결국 useMemo를 통해 최적화를 하고 싶다면 re-render와 관련있는 모든 것은 memo로 묶는 것이 좋다.

  ```typescript
  // searchWord에 따른 목록 구성 처리를 memo로 기억하는게 re-render효율에서 더욱 좋음.
  const filteredList = useMemo(() => {
    const filteredArray = array.filter(item => item.indexOf(searchWord) > -1);
    return filteredArray.map(item => {
      return <ListItem key={item.id}>{item.label}</ListItem>;
    });
  }, [searchWord]);

  return <>{filteredList}</>;
  ```

    </details>

- re-render와 관련없는 React.memo, useMemo, useCallback 은 사용하지 않는게 좋다.
  - 참조 동일성과 관련없는 일반적인 연산은 훅을 사용하지 않아도 충분히 퍼포먼스가 좋다.

**참고**

- [how to useMemo,useCallback](https://www.developerway.com/posts/how-to-use-memo-use-callback)
