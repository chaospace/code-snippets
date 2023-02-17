import React, {PropsWithChildren, useCallback, useState} from 'react';
import ErrorBoundary, {FallbackVO} from '@/ui/boundary/ErrorBoundary';
import Button from '@/ui/styled/Button';

// 에러바운더리 테스트
const ErrorFallback = ({error, errorInfo, reset}: FallbackVO) => {
  console.log(error, errorInfo);
  return (
    <>
      <span>error-boudnary!!</span>
      <Button
        onClick={() => {
          reset();
          //feedbackHandler(false);
        }}
      >
        리로드!
      </Button>
    </>
  );
};

const ErorrContent = (props: any) => {
  const [provider, setProvider] = useState([{title: '에러가 보일 영역입니다.'}]);

  const reqData = useCallback(() => {
    console.log('props', props.hasError);
    const path = props.hasError
      ? 'https://jsonplaceholder.typicode.com/posts'
      : 'https://test.typicode.com/';

    fetch(path)
      .then(res => res.json())
      .then(data => setProvider(data))
      .catch(e => {
        console.log('cach--');
        props.setError(true);
        setProvider(e);
      });
  }, [props]);
  console.log('provider', provider);
  return (
    <>
      <Button onClick={reqData}>데이터 로드</Button>
      {provider[0].title}
    </>
  );
};

function ErrorPage(props: PropsWithChildren<{}>) {
  const [hasError, setError] = useState(false);

  return (
    <div>
      <ErrorBoundary fallback={(info: FallbackVO) => <ErrorFallback {...info} />}>
        {props.children}
        <ErorrContent hasError={hasError} setError={setError} />
      </ErrorBoundary>
    </div>
  );
}

export default ErrorPage;
