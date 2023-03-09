let template = '';

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById('todo-item');
  }
  return template.content.firstElementChild.cloneNode(true);
};

const getTodoElement = (todo, index) => {
  const {text, completed} = todo;
  const ele = createNewTodoNode();
  ele.querySelector('input.edit').value = text;
  ele.querySelector('label').textContent = text;

  if (completed) {
    ele.classList.add('completed');
    ele.querySelector('input.toggle').checked = true;
  }
  ele.querySelector('button.destroy').dataset.index = index;

  return ele;
};

export default (targetElement, {todos}, events) => {
  const {deleteItem} = events;
  const newTodoList = targetElement.cloneNode(true);
  newTodoList.innerHTML = ''; //이전 내용 제거
  todos
    .map((todo, index) => getTodoElement(todo, index))
    .forEach(todoEle => {
      newTodoList.appendChild(todoEle);
    });

  newTodoList.addEventListener('click', e => {
    if (e.target.matches('button.destroy')) {
      deleteItem(e.target.dataset.index);
    }
  });
  return newTodoList;
};
