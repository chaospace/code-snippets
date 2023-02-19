import todosView from './views/todos.js';
import todoCounterView from './views/counter.js';
import todoFilterView from './views/filters.js';

const registry = {
  todos: todosView,
  counter: todoCounterView,
  filters: todoFilterView
};

const renderWrapper = component => {
  return (targetElement, state) => {
    const element = component(targetElement, state);

    const childComponents = element.querySelectorAll('[data-component]');

    Array.from(childComponents).forEach(target => {
      const name = target.dataset.component;

      const Child = registry[name];
      if (!Child) {
        return;
      }

      target.replaceWith(Child(target, state));
    });

    return element;
  };
};

const add = (name, component) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (root, state) => {
  const cloneComponent = root => {
    return root.cloneNode(true);
  };
  return renderWrapper(cloneComponent)(root, state);
};

export default {add, renderRoot};
