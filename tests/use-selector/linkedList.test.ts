/**
 * linkedlist 테스트
 */

type Listener = {
  callback: Function;
  prev: Listener | null;
  next: Listener | null;
};

type Subscription = ReturnType<typeof createListeners>;
/**
 * link를 통한 목록관리 테스트
 */

function createListeners() {
  const listeners: Listener[] = [];
  let first: Listener | null = null;
  let last: Listener | null = null;

  return {
    append(callback: Function) {
      const listener: Listener = (last = {callback, next: null, prev: last});
      if (listener.prev) {
        listener.prev.next = listener;
      } else {
        first = listener;
      }
      listeners.push(listener);
      return listener;
    },
    log() {
      for (const l of listeners) {
        console.log('listener', l);
      }
    },
    remove(listener: Listener) {
      if (listener.next) {
        listener.next.prev = listener.prev;
      } else {
        last = listener.prev;
      }

      if (listener.prev) {
        listener.prev.next = listener.next;
      } else {
        first = listener.next;
      }
    }
  };
}

describe('링크드리스트 원리 파악', () => {
  let ob: Subscription;
  beforeEach(() => {
    ob = createListeners();
  });
  it('linkedList 추가 로직 확인', () => {
    const foo = () => console.log('foo');
    const bar = () => console.log('bar');
    const rect = () => console.log('rect');
    const fooListener = ob.append(foo);
    console.log('=====first====');
    ob.log();

    const barListener = ob.append(bar);
    console.log('=====sec====');
    ob.log();

    const rectListener = ob.append(rect);
    console.log('=====third====');
    ob.log();

    console.log('=======제거시작========');
    ob.remove(barListener);
    ob.log();

    console.log('=====fooListener====');
    ob.remove(fooListener);
    ob.log();

    console.log('=====rectListener====');
    ob.remove(rectListener);
    ob.log();
  });
});
