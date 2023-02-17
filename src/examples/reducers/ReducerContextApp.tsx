import React, {createContext, PropsWithChildren, useContext, useReducer, useState} from 'react';
import {HBox, VBox} from '@/ui/styled/Box';
import taskReducer, {initialTasks, TaskAction, TaskActionEvent, TaskVO} from './taskReducer';
import TodoList, {TodoInputText} from './elements';

const TaskDispatchContext = createContext<React.Dispatch<TaskActionEvent>>(
  {} as React.Dispatch<TaskActionEvent>
);
const TaskListContext = createContext<Partial<TaskVO>[]>([]);

const TodoInput = () => {
  const [todoText, setTodoText] = useState('');
  const validTodoText = todoText.length ? false : true;
  const dispatch = useContext(TaskDispatchContext);
  return (
    <HBox gap={8}>
      <TodoInputText
        placeholder="할 일을 적어주세요."
        value={todoText}
        onInput={(event: React.FormEvent<HTMLInputElement>) =>
          setTodoText(event.currentTarget.value)
        }
      />
      <button
        disabled={validTodoText}
        onClick={() => {
          dispatch({
            type: TaskAction.ADD,
            payload: {
              text: todoText
            }
          });
          setTodoText('');
        }}
      >
        추가
      </button>
    </HBox>
  );
};

const TaskList = () => {
  const tasks = useContext(TaskListContext);
  const dispatch = useContext(TaskDispatchContext);
  return (
    <ul>
      {tasks.map((task: any) => {
        return (
          <TodoList.ListItem key={task.id}>
            <TodoList.Label>
              <TodoList.CheckBox
                checked={task.done}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch({
                    type: TaskAction.UPDATE,
                    payload: {...task, done: event.currentTarget.checked}
                  });
                }}
              />
              <TodoList.TextField>{task.text}</TodoList.TextField>
            </TodoList.Label>
            <TodoList.Button
              onClick={() => {
                dispatch({
                  type: TaskAction.DELETE,
                  payload: {
                    id: task.id
                  }
                });
              }}
            >
              삭제
            </TodoList.Button>
          </TodoList.ListItem>
        );
      })}
    </ul>
  );
};

const TaskProvider = ({children}: PropsWithChildren<{}>) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  return (
    <TaskListContext.Provider value={tasks}>
      <TaskDispatchContext.Provider value={dispatch}>{children}</TaskDispatchContext.Provider>
    </TaskListContext.Provider>
  );
};

function ReducerContextApp() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  return (
    <VBox gap={8}>
      <TaskProvider>
        <TodoInput />
        <TaskList />
      </TaskProvider>
    </VBox>
  );
}

export default ReducerContextApp;
