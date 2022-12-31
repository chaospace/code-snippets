// tonumber동작테스트

import isSame from '@/utils/isSame';
import toArray from '@/utils/toArray';
import toNumber from '@/utils/toNumber';

describe.skip('toNumber 테스트', () => {
  it('"213.220"은 리턴은 "213.22"가 온다', () => {
    const a = toNumber('213.220');
    expect(a).toEqual(213.22);
  });

  it('toArray 동작 테스트', () => {
    const result = toArray({
      name: 'cc',
      job: 'front'
    });
    console.log('result', result);
  });
});

describe('isSame동작 테스트', () => {
  it('2와 2비교', () => {
    expect(isSame(2, 2)).toBeTruthy();
  });

  it('chaospace 와 name 비교', () => {
    expect(isSame('chaospace', 'name')).toBeFalsy();
  });
});
