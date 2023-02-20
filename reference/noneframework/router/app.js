import createPages from './pages.js';
import createRouter from './router.js';

const container = document.querySelector('main');
const pages = createPages(container);
const router = createRouter();
router
  .addRoute('#/', pages.home)
  .addRoute('#/list', pages.list)
  .addRoute('#/detail/:id', pages.detail)
  .addRoute('#/detail/:id/:anotherid', pages.anotherDetail)
  .setNotFound(pages.notFound)
  .start();

const NAV_BTN_SELECTOR = 'button[data-navigate]';

document.body.addEventListener('click', e => {
  if (e.target.matches(NAV_BTN_SELECTOR)) {
    router.navigate(e.target.dataset.navigate);
  }
});
