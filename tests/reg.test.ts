// 정규식 테스트

describe('정규식 테스트', () => {
  it('부정형 후방탐색 테스트', () => {
    const message = '우니라나 1234430303.2203032';
    //const r = message.match(/(?=(\d{3})+(?!\d))/);
    console.log('후방', message.replace(/(?=(\d{3})+(?!\d))/, ','));
    console.log('콤마', message.match(/(?=(\d{3})+(?!\d))/));
    // /console.log('콤마', message.match(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/));
    console.log('123-replace', 'abcde:1004002fg'.match(/.(?!:)/));
  });
});
