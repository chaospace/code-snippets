const getTodoCount = todos => {
  const notCompleted = todos.filter(todo => !todo.completed);
  const {length} = notCompleted;

  return `${length} Item left`;
};

export const EVENTS = {
  UPDATE_FILTER: 'UPDATE_FILTER'
};

export default class Footer extends HTMLElement {
  static get observedAttributes() {
    return ['filter', 'todos'];
  }

  get todos() {
    if (!this.hasAttribute('todos')) {
      return [];
    }
    return JSON.parse(this.getAttribute('todos'));
  }

  set todos(value) {
    this.setAttribute('todos', JSON.stringify(value));
  }

  get filter() {
    return this.getAttribute('filter');
  }

  set filter(value) {
    this.setAttribute('filter', value);
  }

  updateFooter() {
    this.querySelectorAll('li a').forEach(a => {
      if (a.textContent === this.filter) {
        a.classList.add('selected');
      } else {
        a.classList.remove('selected');
      }
    });

    this.querySelector('span.todo-count').textContent = getTodoCount(this.todos);
  }

  connectedCallback() {
    const template = document.getElementById('footer');
    const content = template.content.firstElementChild.cloneNode(true);
    this.appendChild(content);

    //const {filter, todos} = this;
    this.querySelector('.filters').addEventListener('click', e => {
      this.dispatchEvent(
        new CustomEvent(EVENTS.UPDATE_FILTER, {
          detail: {filter: e.target.textContent}
        })
      );
    });

    this.updateFooter();
  }

  attributeChangedCallback() {
    //console.log('속성 변경!!!');
    this.updateFooter();
  }
}
