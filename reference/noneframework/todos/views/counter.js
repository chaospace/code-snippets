const getTodoCountElement = todos => {
  const notCompleted = todos.filter(todo => !todo.completed);

  const todoCount = notCompleted.length;
  if (todoCount === 1) {
    return '1 item left';
  }

  return `${todoCount} Items left`;
};

export default (targetElement, {todos}) => {
  const newTodoCounter = targetElement.cloneNode(true);
  newTodoCounter.textContent = getTodoCountElement(todos);
  return newTodoCounter;
};
