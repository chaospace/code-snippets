/**
 * eventBus를 위한 todo모델
 */

const INITIAL_STATE = {
  todos: [],
  currentFilter: 'all'
};

type State = typeof INITIAL_STATE;
type Action = {
  type: string;
  payload: any;
};

const cloneDeep = (obj: State) => JSON.parse(JSON.stringify(obj));

const updateItem = (state: State, event: any) => {
  const {index, text} = event.payload;
  if (!text) {
    return;
  }

  if (index < 0) {
    return;
  }

  if (!state.todos[index]) {
    return;
  }

  return {
    ...state,
    todos: state.todos.map((todo: any, idx: number) => {
      if (idx === index) {
        todo.text = text;
      }
      return todo;
    })
  };
};

const addItem = (state: State, event: any) => {
  const {text} = event.payload;
  if (!text) {
    return;
  }
  return {
    ...state,
    todos: [
      ...state.todos,
      {
        text,
        completed: false
      }
    ]
  };
};

const methods = {
  ITEM_ADD: addItem,
  ITEM_UPDATE: updateItem
};

export default (initialState = INITIAL_STATE) => {
  return (prevState: State, event: Action) => {
    if (!prevState) {
      return cloneDeep(initialState);
    }

    const action = methods[event.type];
    if (!action) {
      return prevState;
    }
    return action(prevState, event);
  };
};
