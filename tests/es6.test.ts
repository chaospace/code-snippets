/**
 * es6의 blockscope활용
 * 참조가 남아 회수되지 않는 변수를 blockscope을 이용해 가비지 대상이 되게 할 수 있음.
 */

describe('블록스콥', () => {
  it.skip('블록스콥을 이용하면 참조가 없는 변수를 가비지 대상이 되게 할 수 있음', () => {
    // bigData는 블록안에서만 유효하고 이후 가비지에 대상이 됨.
    {
      let bigData: Object = {
        age: 20
      };
      function foo(data: Object) {
        console.log(data);
      }
    }
  });

  it.skip('오브젝트 get set', () => {
    let obj: any = {
      get a() {
        return `custom__get__${this.__a__}`;
      },
      set a(value: any) {
        this.__a__ = value;
      }
    };
    console.log('obj-set', (obj.a = 'chaospace'));
    console.log('obj-get', obj.a);
  });

  it('중첩합수 this참조', () => {});
});
