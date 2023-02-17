const initialTasks: TaskVO[] = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false}
];

const TaskAction = {
  ADD: 'ADD',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE'
} as const;

type TaskVO = {
  id: number;
  text: string;
  done: boolean;
};

//type TaskActionKey = keyof typeof TaskAction;
//type TaskActionValue = typeof TaskAction;

type TaskActionEvent = {
  type: keyof typeof TaskAction;
  payload: Partial<TaskVO>;
};

function taskReducer(tasks: TaskVO[], action: TaskActionEvent) {
  switch (action.type) {
    case TaskAction.ADD:
      return [...tasks, action.payload];
      break;

    case TaskAction.DELETE:
      return tasks.filter(task => action.payload.id !== task.id);
      break;

    case TaskAction.UPDATE:
      return tasks.map(task => (task.id === action.payload.id ? action.payload : task));
      break;
  }
}

export {initialTasks, TaskVO, TaskAction, TaskActionEvent};
export default taskReducer;
