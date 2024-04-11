//  반복 테스트

import { ObjType } from '@/types/types';
import isArray from '@/utils/isArray';

describe('for 루프안에서 continue동작 테스트', () => {
  const testObj: ObjType = {
    name: 'chaospace',
    age: 200,
    history: {
      1980: {
        school: '중화'
      },
      1990: {
        school: '면목고'
      }
    },
    frends: [1, 2, 3, 4],
    job: 'front-end-developer'
  };

  it('for in 안에서 continue는 다음 코드 진행을 멈추게 한다.', () => {
    console.log('testObj', testObj);
    for (let prop in testObj) {
      const info: any = testObj[prop];
      if (typeof info === 'object') {
        if (isArray(info)) {
          console.log('값이 배열일 경우 다음 루프 스킾!');
          // key에 값이 배열일 경우는 다음 null체크 동작은 skip~~
          continue;
        }

        if (info !== null) {
          console.log('info not null!');
          console.log('--', info);
        }
        // key에 값이 객체일 경우는 기본동작 skip~~
        continue;
      }
      console.log('prop', prop);
    }
  });
});
