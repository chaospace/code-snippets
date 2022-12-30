// 정규식 테스트

describe.skip('정규식 테스트', () => {
  it('부정형 후방탐색 테스트', () => {
    const message = '우니라나 1234430303.2203032';
    //const r = message.match(/(?=(\d{3})+(?!\d))/);
    console.log('후방', message.replace(/(?=(\d{3})+(?!\d))/, ','));
    console.log('콤마', message.match(/(?=(\d{3})+(?!\d))/));
    // /console.log('콤마', message.match(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/));
    console.log('123-replace', 'abcde:1004002fg'.match(/.(?!:)/));
  });
});

describe.skip('스타일문자열 제어 테스트', () => {
  it.skip('camelCase를 snakeCase로 변환', () => {
    const message = 'paddingLeftSide';
    // 유니코드 글자 중 대문자를 찾음.
    const express = /(\p{Ll})(\p{Lu})/gu;
    //\b 단어 경계와 일치
    console.log('test', message.replace(express, `$1_$2`).toLowerCase());
  });

  it.skip('속성값에 단위가 있는지 여부 체크', () => {
    const message = 'block';
    const message2 = '32px';
    // 유니코드 글자 중 대문자를 찾음.
    const units = ['px', 'em', 'rem', 'vw', 'vh', '%'];
    const express = /\d+(?<unit>%|px|em|rem|vw|vh)?/g;
    const results = message2.match(express);

    //\b 단어 경계와 일치
    console.log(
      'test',
      message.match(express),
      'message2',
      message2.match(express),
      'groups',
      '19 10px 1em'.match(express),
      '숫자매칭 테스트',
      '13px 19em'.match(/\d+/g),
      ''
    );
  });

  it.skip('replace를 통한 기본단위 추가', () => {
    //const express = /(\d+)\s(\d+[%|px]?)/g;
    const express2 = /(?!\d+[rem|px|em|vw|vh|%])(\d+)/g;
    //console.log('test', '10 30px'.match(express));
    console.log('replace', express2, '100vh 10px 10 309px 20em'.match(express2));
    console.log('replace', express2, '100 10% 10vh 309px 10em'.replace(express2, `$1px`));

    console.log('I paid $30 for 100 apples.', 'I paid $30 for 100 apples'.match(/(?!\$)\d+/));
  });

  it.skip('정규식을 이용한 숫자 콤마처리', () => {
    const message = '우리나라 1234430303.223322원';
    //const r = message.match(/(?=(\d{3})+(?!\d))/);
    //console.log('후방', message.match(/(\d{3})+(?=\.)/));

    //console.log('match', message.match(/([+-]?\d+)(\d{3})/g));
    // 전방탐색을 이용한 숫자 콤마 처리
    // 소수점 뒤는 탐색에서 제외하기 위한 조건을 추가함.
    const pattern = /\B(?=(\d{3})+(?=[.|,]))/g;

    let value = message;
    console.log('pattern.test(value)', pattern.test(value));
    console.log('match', message.match(pattern));
    console.log('replace', value.replace(pattern, ','));

    // while (pattern.test(value)) {
    //   value = value.replace(pattern, `,`);
    //   console.log('replace-value', value);
    // }
    //console.log('-after-', value);
    //console.log('콤마', message.match(/(?=(\d{3})+(?!\d))/));
    // /console.log('콤마', message.match(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/));
    //console.log('123-replace', 'abcde:1004002fg'.match(/.(?!:)/));
  });

  // margin, padding 단축 스타일 처리

  //('𝒳𝒴');
});

describe.skip('탐색 테스트', () => {
  it('게으른 탐색 동작 테스트', () => {
    const pattern = /<a href=".*" class="doc">/g;
    const str = '...<a href="link" class="doc">...';
    console.log(str.match(pattern)); // <a href="link" class="doc">
  });

  it('게으른 탐색 테스트2', () => {
    const str = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
    const pattern = /<a href=".*" class="doc">/g;
    console.log(str.match(pattern));
  });

  it('게으른 탐색 테스트3', () => {
    const str = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
    const pattern = /<a href=".*?" class="doc">/g;
    console.log(str.match(pattern));
  });

  it('게으른 탐색 테스트4', () => {
    const str = '...<a href="link1" class="wrong">... <p style="" class="doc">...';
    const pattern = /<a href=".*?" class="doc">/g;
    console.log(str.match(pattern));
  });
});

describe('replace테스트', () => {
  it('replace심볼사용', () => {
    const message = '30 20 10';
    console.log('origin', message);
    console.log('message', message.match(/(30)/));
    console.log('$n심볼 사용', message.replace(/(30)/, '$1px'));
    console.log('$` 심볼 사용- 매칭 전 문자열의 일부 삽입', message.replace(/(30)/, '$`9'));
    console.log("$' 심볼 사용- 매칭 후 문자열의 일부 삽입", message.replace(/(30)/, "$' "));
    console.log('$& 심볼 사용- 매칭 문자열의 전체 삽입', message.replace(/(30)/, '$&px'));
  });
});
