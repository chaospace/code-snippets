/**
 * taskReducer동작 테스트
 *
 * 왜 이름이 reducer가?
 *  - 배열 reduce처럼 요청의 수와 상관없이 초기값에 action의 정보를 가공해 리턴해 주는 것에서 유례.
 *
 * array.reduce(reducer함수) <- reduce에서 수행하는 함수를 reducer라 부름.
 */

import taskReducer, {TaskAction, TaskActionEvent, TaskVO} from '@/examples/reducers/taskReducer';

describe('taskReducer동작 테스트', () => {
  it('initialActions의 수에 상관없이 모든 동작을 수행한다', () => {
    const initialTasks: TaskVO[] = [];
    const taskList: TaskActionEvent[] = [
      {type: TaskAction.ADD, payload: {id: 0, text: 'css study', done: false}},
      {type: TaskAction.ADD, payload: {id: 1, text: 'html study', done: false}},
      {type: TaskAction.ADD, payload: {id: 2, text: 'ts study', done: false}},
      {type: TaskAction.ADD, payload: {id: 3, text: 'react study', done: false}},
      {type: TaskAction.ADD, payload: {id: 4, text: 'js study', done: true}},
      {type: TaskAction.DELETE, payload: {id: 0}}
    ];
    const results = taskList.reduce(taskReducer, initialTasks);
    console.log(results);
  });
});
