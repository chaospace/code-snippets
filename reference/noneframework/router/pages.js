const createPages = container => {
  const home = () => {
    container.textContent = 'This is home page';
  };

  const list = () => {
    container.textContent = 'This is list page';
  };

  const notFound = () => {
    container.textContent = 'Page not found';
  };

  return {
    home,
    list,
    notFound
  };
};

export default createPages;
