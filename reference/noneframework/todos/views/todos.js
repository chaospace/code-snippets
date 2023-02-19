let template = '';

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById('todo-item');
  }
  return template.content.firstElementChild.cloneNode(true);
};

const getTodoElement = (todo, index, events) => {
  const {text, completed} = todo;
  const ele = createNewTodoNode();
  ele.querySelector('input.edit').value = text;
  ele.querySelector('label').textContent = text;

  if (completed) {
    ele.classList.add('completed');
    ele.querySelector('input.toggle').checked = true;
  }

  const handler = _ => events.deleteItem(index);
  ele.querySelector('button.destroy').addEventListener('click', handler);

  return ele;
};

export default (targetElement, {todos}, events) => {
  const newTodoList = targetElement.cloneNode(true);
  newTodoList.innerHTML = ''; //이전 내용 제거
  todos
    .map((todo, index) => getTodoElement(todo, index, events))
    .forEach(todoEle => {
      newTodoList.appendChild(todoEle);
    });
  //newTodoList.innerHTML = todoElements;
  return newTodoList;
};
