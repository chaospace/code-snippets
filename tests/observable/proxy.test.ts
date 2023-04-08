// proxy

describe('프록시', () => {
  it('리시버동작 확인', () => {
    let proxy = new Proxy(
      {age: 13},
      {
        get: function (target, property, receiver) {
          //console.log('reciver-', receiver);
          if (property in target) {
            return target[property];
          } else {
            return '찾지 못함';
          }
        }
      }
    );

    let temp = proxy.age;

    let obj = {
      age: 12,
      __proto__: proxy
    };

    temp = obj.age;
  });
});
