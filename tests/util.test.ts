// tonumber동작테스트

import toArray from '@/utils/toArray';
import toNumber from '@/utils/toNumber';

describe('toNumber 테스트', () => {
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
