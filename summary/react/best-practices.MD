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

- [원문](https://www.developerway.com/posts/how-to-use-memo-use-callback)

## 성능이 좋은 리액트 코드 : 룰, 패턴, 해야할 것과 하지 말아야할 것

- 인라인 함수를 useCallback으로 감싸는 이유가 자식 요소의 re-rendering방지를 위해서라면 동작하지 않으니 하지마라.

  ```typescript
  // ...이 경우 useCallback을 사용해도 부모 요소가 재랜더링 되면 자식도 같이 랜더링 된다.
  const onCountryChanged = useCallback(c => setSelectedCountry(c), []);
  const onCountrySaved = useCallback(() => setSavedCountry(selectedCountry), []);

  return (
    <>
      ...
      <CountriesList onCountryChanged={onCountryChange} />
      <SelectedCountry onCountrySaved={onCountrySaved} />
      ...
    </>
  );
  ```

- 컴포넌트가 상태를 관리한다면 랜더Tree와 관련없는 상태를 찾고 memo를 이용해 분리해 최대한 re-rendering이 발생하지 않도록 한다.

  ```typescript
  // selectedCountry는 SelectedCountry에만 영향을 줌
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  // savedCountry는 CountriesList에만 영향을 줌
  const [savedCountry, setSavedCountry] = useState<Country>(countries[0]);

  const list = useMemo(() => {
    return (
      <CountriesList
        countries={countries}
        onCountryChanged={c => setSelectedCountry(c)}
        savedCountry={savedCountry}
      />
    );
  }, [savedCountry, countries]);

  const selected = useMemo(() => {
    return (
      <SelectedCountry
        country={selectedCountry}
        onCountrySaved={() => setSavedCountry(selectedCountry)}
      />
    );
  }, [selectedCountry]);
  ```

- 다른 컴포넌트 안에서 새로운 컴포넌트를 절대 생성하지 말것( 필요하면 별도 분리 )

  > 일반적인 re-render비용 <<<<< 새로운 컴포넌트를 생성 후 mount 비용

  ```typescript
  // 목록 아이템을 내부에서 만드는 비용은 비쌈.
  const Item = ({country}: {country: Country}) => {
    // ... same code
  };

  return (
    <div>
      {countries.map(country => (
        <Item country={country} key={country.id} />
      ))}
    </div>
  );
  ```

  이런 경우 별도 컴포넌트로 분리

  ```typescript
  // 아이템을 별도 컴포넌트로 분리.
  const Item = ({country}: {country: Country}) => {
    // ... same code
  };
  // 리스트에서는 분리된 Item을 이용해 목록 생성
  const List = () => {
    return (
      <div>
        {countries.map(country => (
          <Item country={country} key={country.id} />
        ))}
      </div>
    );
  };
  ```

- context의 value가 기본형이 아니라면 항상 memo를 사용해 re-render를 방지

- **참고**

- [원문](https://www.developerway.com/posts/how-to-write-performant-react-code)

## 커스텀 훅 작성시 유의사항

- 단일책임원칙을 준수해라(OOP와 동일)

  - hook안에서 다른 훅을 참조해 사용하면 결국 host컴포넌트에 re-rendering이 발생하는 이유가 된다.

      <details>  
        <summary> 샘플보기 </summary>

    ```typescript
    // useModal.ts
    const useModal = () => {
      const [isOpen, setIsOpen] = useState(false);
      const ref = useRef<HTMLElement>(null);
      // useModal에서 단일책임을 어기고 scroll상태관리를 추가한 격이 됨.
      const [scroll, setScroll] = useState(0);

      // 결국 scroll 이벤트 마다 scroll값이 변경되고 호스트 컴포넌트인 Page가 re-rendering됨.
      useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
          setScroll(element?.scrollTop || 0);
        };

        element.addEventListener('scroll', handleScroll);
        return () => {
          element.removeEventListener('scroll', handleScroll);
        };
      });

      const Dialog = useMemo(
        () => () => <ModalBase onClosed={close} isOpen={isOpen} ref={ref} />,
        [isOpen]
      );

      return useMemo(
        () => ({
          isOpen,
          Dialog,
          open,
          close
        }),
        [isOpen, Dialog, open, close]
      );
    };

    const Page = () => {
      const {Dialog, open} = useModal();
      return (
        <div>
          <button onClick={open}>모달열기</button>
          <Dialog />
          <OtherComponent />
        </div>
      );
    };
    ```

    </details>

  - 단일책임을 무시한다면 내부에서 사용되는 상태와 훅들 역시 한덩어리로 보고 호스트 컴포넌트의 무거운 re-rendering영역을 분리할 수 있는 Boundary엘리먼트를 고민해야 될듯.
    <details>
        <summary> 샘플보기 </summary>

    ```typescript
    // scroll이 발생해도 Page와 독립된 ModalButtonElement만 갱신됨.
    const ModalButtonElement = () => {
      const {Dialog, open} = useModal();
      return (
        <>
          <button onClick={open}>모달열기</button>
          <Dialog />
        </>
      );
    };

    const Page = () => {
      const {Dialog, open} = useModal();
      return (
        <div>
          <ModalButtonElement />
          <OtherComponent />
        </div>
      );
    };
    ```

    </details>
