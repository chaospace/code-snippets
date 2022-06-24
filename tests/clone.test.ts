// objClone테스트

describe('objClone동작 테스트', () => {
  it('제네릭 리턴 타입 확인', () => {
    //무조건 에러처리
    const myData = {
      name: 'chaospace',
      age: 30
    };
    const a = objClone(myData);
    console.log('a', a);
  });
});
