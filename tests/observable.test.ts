// obserable 동작 테스트

let currentObserver: any = null;
function observe(fn: any) {
  currentObserver = fn;
  fn();
  currentObserver = null;
}

function observable(obj: any) {
  Object.keys(obj).forEach(key => {
    const propsObservers: any[] = [];
    let _value = obj[key];

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver && !propsObservers.includes(currentObserver)) {
          propsObservers.push(currentObserver);
        }
        return _value;
      },
      set(value) {
        _value = value;
        propsObservers.forEach(observer => observer());
      }
    });
  });
  return obj;
}

const player = observable({
  name: 'a',
  score: 20
});

observe(() => {
  console.log(player.name, player.score);
});

player.name = 'b';
