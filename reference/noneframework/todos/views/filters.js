export default (targetElement, {currentFilter}) => {
  const newFilterElement = targetElement.cloneNode(true);

  Array.from(newFilterElement.querySelectorAll('li a')).forEach(a => {
    if (a.textContent === currentFilter) {
      a.classList.add('selected');
    } else {
      a.classList.remove('selected');
    }
  });
  return newFilterElement;
};
