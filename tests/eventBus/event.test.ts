/**
 * eventBus에서 사용하는 모델
 * 참조 투명성을 위해 순수함수로 구성되야 한다.
 */

import eventBusFactory from './eventBus';
import todoModelFactory from './todoModel';
type EventModel = {
  counter: number;
};

type Event = {
  type: string;
  payload: EventModel;
};
let eventBus: ReturnType<typeof eventBusFactory>;

const currentModel = (state: EventModel, event: Event) => {
  if (!event) {
    return {
      counter: 0
    };
  }

  if (event.type !== 'COUNTER') {
    return state;
  }
  console.log(state, 'type', event.type);
  return {
    counter: state.counter + 1
  };
};

describe('이벤트버스', () => {
  // beforeEach(() => {
  //   eventBus = eventBusFactory(currentModel);
  // });

  it.skip('모델이 변경되면 subscribe이 발생한다.', () => {
    let counter = 0;
    eventBus = eventBusFactory(currentModel);
    eventBus.subscribe((data: any) => {
      counter = data.counter;
    });
    eventBus.dispatch({type: 'COUNTER'});
    eventBus.dispatch({type: 'NO-COUNTER'});
    expect(counter).toBe(1);
  });

  it('todo모델을 이용한 이벤트 버스 동작 테스트', () => {
    const ModelFunc: Function = todoModelFactory();
    eventBus = eventBusFactory(ModelFunc);
    //console.log('bus', eventBus);
    eventBus.subscribe((data: any) => {
      console.log('subscribe-data', data);
      console.log('랜더!');
    });

    eventBus.dispatch({
      type: 'ITEM_ADD',
      payload: {
        text: '해야할 일 추가'
      }
    });
  });
});
