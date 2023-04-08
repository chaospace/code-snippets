// 템플릿 문자열 함수 동작 테스트

const logArgs = (...args: any) => console.log(args);

describe.skip('템플릿문자열 동작 비교', () => {
  const vars = 'pizza';
  const foo = 'banana';
  it('함수로 호출할 때', () => {
    logArgs('a', 'b');
    logArgs(`i like ${vars}`);
    logArgs(`i like ${vars} and ${foo}`);
  });

  it('템플릿으로 호출할 때', () => {
    logArgs``;
    logArgs`i like ${vars}`;
    logArgs`i like ${vars} and ${foo}`;
  });
});

describe('템플릿 내부 함수 동작 비교', () => {
  const testFunc = () => console.log('pizza');
  //const foo = 'banana';
  it('함수로 호출할 때', () => {
    //logArgs('a', 'b');
    logArgs(`i like ${() => console.log('pizza')}`);
    //logArgs(`i like ${vars} and ${foo}`);
  });

  it('템플릿으로 호출할 때', () => {
    //logArgs``;
    logArgs`i like ${() => console.log('pizza')}`;
    //logArgs`i like ${vars} and ${foo}`;
  });
});
