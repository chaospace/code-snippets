import todoList from './views/todos.js';
import todoCounter from './views/counter.js';
import todoFilter from './views/filters.js';

export default (targetElement, {currentFilter, todos}) => {
  const element = targetElement.cloneNode(true);
  const list = element.querySelector('.todo-list');
  const counter = element.querySelector('.todo-count');
  const filters = element.querySelector('.filters');

  list.replaceWith(todoList(list, state));
  counter.replaceWith(todoCounter(counter, state));
  filters.replaceWith(todoFilter(filters, state));

  return element;
};
