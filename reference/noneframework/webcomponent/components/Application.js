import {EVENTS} from './List.js';
import {EVENTS as FOOTER_EVENTS} from './Footer.js';

export default class Application extends HTMLElement {
  constructor() {
    super();
    this.state = {
      todos: [],
      filter: 'All'
    };

    this.template = document.getElementById('todo-app');
  }

  deleteItem(index) {
    this.state.todos.splice(index, 1);
    this.syncAttributes();
  }

  updateCompleted({index, completed}) {
    this.state.todos[index].completed = completed;
    this.syncAttributes();
  }

  addItem(text) {
    this.state.todos.push({
      text,
      completed: false
    });
    this.syncAttributes();
  }

  updateFilter(value) {
    this.state.filter = value;
    this.syncAttributes();
  }

  syncAttributes() {
    this.list.todos = this.state.todos;
    this.footer.todos = this.state.todos;
    this.footer.filter = this.state.filter;
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      // 템플릿 클론 후 추가
      const content = this.template.content.firstElementChild.cloneNode(true);
      this.appendChild(content);
      // 인풋 이벤트 등록
      this.querySelector('.new-todo').addEventListener('keypress', e => {
        if (e.key === 'Enter') {
          this.addItem(e.target.value);
          e.target.value = '';
        }
      });

      // 하위 컴포넌트 구성
      this.footer = this.querySelector('todomvc-footer');
      this.list = this.querySelector('todomvc-list');
      this.list.addEventListener(EVENTS.DELETE_ITEM, e => {
        this.deleteItem(e.detail.index);
      });
      this.list.addEventListener(EVENTS.UPDATE_COMPLETED, e => {
        this.updateCompleted(e.detail);
      });
      this.footer.addEventListener(FOOTER_EVENTS.UPDATE_FILTER, e => {
        this.updateFilter(e.detail.filter);
      });
      this.syncAttributes();
    });
  }
}
