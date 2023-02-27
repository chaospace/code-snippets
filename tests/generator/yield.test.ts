/**
 * generation테스트
 *
 * 중첩된 generator함수 실행은 yield*를 사용.
 */

function* generator_function_1() {
  yield 2;
  yield 3;
}

function* generator_function_2() {
  yield 1;
  // 중첩된 이터네이션 규약처리
  yield* generator_function_1();
  yield* [4, 5];
}

describe.skip('이터레이터', () => {
  it('yield*키워드를 이용하면 중첩된 제너레이터 함수 처리가 가능하다.', () => {
    const generator = generator_function_2();

    // console.log(generator.next().done);
    let iter = generator.next();
    while (!iter.done) {
      console.log(iter.value);
      iter = generator.next();
    }
  });

  it('for of를 이용하면 이터러블 객체 루프를 처리할 수 있다.', () => {
    for (let value of generator_function_2()) {
      console.log('for-of', value);
    }
  });
});

// promise 처리

describe.skip('promise', () => {
  it('중첩된 promise응답 테스트', () => {
    const A = new Promise((resolve, reject) => {
      const B = new Promise((res, rej) => {
        res('B-응답결과!');
      });
      resolve(B);
    });

    console.log(
      'A',
      A.then(res => console.log(res))
    );
  });
});

describe('다중 제너레이터', () => {
  it.skip('yield에서 값을 리턴받아 사용할 수 있다.', () => {
    let z = 1;
    function* foo(): any {
      // yield를 만나 코드는 멈추고 제어권은 호출하는 곳으로 이동
      let x = yield 2;
      z++;
      let y = yield x * z;
      console.log(x, y, z);
    }

    let it1 = foo();
    let it2 = foo();
    let val1 = it1.next().value; //2
    console.log('val1', val1);
    let val2 = it2.next().value; //2
    //처음 yield에 대한 응답으로 x값을 설정 후 값을 확인
    val1 = it1.next(val2 * 10).value; // x:20, z:2
    val2 = it2.next(val1 * 5).value; // x:200,z:3
    console.log('val1', val1);
    // y값을 설정 후 확인 마지막 return이 없으면 기본적으로 undefined를 반환
    const r1 = it1.next(val2 / 2).value; // y:300
    console.log('r1', r1);
  });
  it('메시지 위임', () => {
    function* foo(): any {
      console.log('*foo() 내부:', yield 'B');
      console.log('*foo() 내부:', yield 'C');
      return 'D';
    }

    function* bar(): any {
      console.log('*bar() 내부:', yield 'A');
      console.log('*bar() 내부:', yield* foo());
      console.log('*bar() 내부:', yield 'E');
      return 'F';
    }
    let it = bar();
    console.log('외부 :', it.next().value);
    console.log('외부 :', it.next(1).value);
    console.log('외부 :', it.next(2).value);
    console.log('외부 :', it.next(3).value);
    console.log('외부 :', it.next(4).value);
  });
});
