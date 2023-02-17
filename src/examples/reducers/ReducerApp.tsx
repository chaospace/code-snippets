import React, {useCallback, useReducer, useState} from 'react';
import {HBox, VBox} from '@/ui/styled/Box';
import taskReducer, {initialTasks, TaskAction, TaskVO} from './taskReducer';
import TodoList, {TodoInputText} from './elements';

/**
 * 리듀서 동작 테스트
 * 리액트로 생각하기
 *   - 목록 삭제는 splice는 순수성을 보장하지 않으니까 filter, slice를 이용한다.
 *   - 목록 업데이트는 map을 통해서 하도록 하자.
 *   - 핸들러를 바로 호출하는 것보다는 내부에서 핸들러에서 파마미터 조합 후 요청을 한다.
 *
 * 상태 업데이트를 좀더 편리하고 일관성 있게 제어할 수 있는 reducer
 * action과 payload를 통해 상태변경 정보를 전달하고 dispatch로 요청을 통일 할 수 있음.
 *
 * reducer를 이용하며 좋은 점
 *  setState를 상태변경 시 마다 호출하지 않아도 됨.
 *  상태변경 코드를 reducer함수 한 곳에서 관리할 수 있음.
 * @returns
 */
function ReducerApp() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [todoText, setTodoText] = useState('');
  const validTodoText = todoText.length ? false : true;

  /* 상태 제어 함수 시작 */
  // 할 일 추가
  const appendTodoItem = useCallback((msg: string) => {
    dispatch({
      type: TaskAction.ADD,
      payload: {
        id: tasks.length,
        text: msg,
        done: false
      }
    });
  }, []);

  // 할 일 제거
  const remoteTodoItem = useCallback((taskId: number) => {
    dispatch({
      type: TaskAction.DELETE,
      payload: {id: taskId}
    });
  }, []);

  // 할 일 상태 업데이트
  // filter를 통한 별도 업데이트가 아닌 map을 통한 새로운 배열 반환
  const updateTodoItem = useCallback((updateTask: TaskVO) => {
    dispatch({
      type: TaskAction.UPDATE,
      payload: {
        ...updateTask
      }
    });
  }, []);
  /* 상태 제어 함수 끝 */

  const appendTodoByText = useCallback((msg: string) => {
    appendTodoItem(msg);
    setTodoText('');
  }, []);

  return (
    <VBox gap={8}>
      <HBox gap={8}>
        <TodoInputText
          placeholder="할 일을 적어주세요."
          value={todoText}
          onInput={(event: React.FormEvent<HTMLInputElement>) =>
            setTodoText(event.currentTarget.value)
          }
        />
        <button disabled={validTodoText} onClick={() => appendTodoByText(todoText)}>
          추가
        </button>
      </HBox>
      <ul>
        {tasks.map((task: any) => {
          return (
            <TodoList.ListItem key={task.id}>
              <TodoList.Label>
                <TodoList.CheckBox
                  checked={task.done}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    updateTodoItem({...task, done: event.currentTarget.checked});
                  }}
                />
                <TodoList.TextField>{task.text}</TodoList.TextField>
              </TodoList.Label>
              <TodoList.Button onClick={() => remoteTodoItem(task.id)}>삭제</TodoList.Button>
            </TodoList.ListItem>
          );
        })}
      </ul>
    </VBox>
  );
}
export default ReducerApp;
