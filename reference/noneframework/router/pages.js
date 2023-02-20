const createPages = container => {
  const home = () => {
    container.textContent = 'This is home page';
  };

  const list = () => {
    container.textContent = 'This is list page';
  };

  const detail = params => {
    const {id} = params;
    container.textContent = `This is detail page ${id}`;
  };

  const anotherDetail = params => {
    const {id, anotherid} = params;
    container.textContent = `This is detail page ${id} \n another detail param ${anotherid}`;
  };

  const notFound = () => {
    container.textContent = 'Page not found';
  };

  return {
    home,
    list,
    detail,
    anotherDetail,
    notFound
  };
};

export default createPages;
