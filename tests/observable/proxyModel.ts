/**
 *
 * proxy를 이용할 때 사용하는 상태 객체
 */

export default (state: any) => {
  const addItem = (text: string) => {
    if (!text) {
      return;
    }
    state.todos = [...state.todos, {text, completed: false}];
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

    state.todos = state.todos.map((todo: any, idx: number) =>
      idx === index ? {...todo, text} : todo
    );
  };

  return {
    addItem,
    updateItemText
  };
};
