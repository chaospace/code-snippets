import observableFactory from './observableFactory';

const INITIAL_STATE = {
  todos: [],
  currentFilter: 'All'
};

const cloneDeep = (obj: Object) => JSON.parse(JSON.stringify(obj));

export default (initialState = INITIAL_STATE) => {
  const state = cloneDeep(initialState);

  const addItem = (text: string) => {
    if (!text) {
      return;
    }
    state.todos.push({
      text,
      completed: false
    });
    return true;
  };

  const updateItemText = (index: number, text: string) => {
    if (!text) {
      return;
    }
    if (index < 0) {
      return;
    }
    if (!state.todos[index]) {
      return;
    }

    state.todos[index].text = text;
    return true;
  };

  const model = {
    addItem,
    updateItemText
  };
  return observableFactory<typeof model, typeof INITIAL_STATE>(model, () => state);
};
