const getTodoElement = todo => {
  const {text, completed} = todo;
  return `
        <li ${completed ? 'class="completed"' : ''}>
            <div class="view">
                <input id="toggle" ${completed ? 'checked' : ''}
                    class="toggle"
                    type="checkbox"
                />
                <label for="toggle">${text}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${text}"/>
        </li>
    `;
};

export default (targetElement, {todos}) => {
  const newTodoList = targetElement.cloneNode(true);
  const todoElements = todos.map(getTodoElement).join('');
  newTodoList.innerHTML = todoElements;
  return newTodoList;
};
