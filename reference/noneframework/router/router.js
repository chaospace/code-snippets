const createRouter = () => {
  const routes = [];
  let notFound = () => {};

  const checkRoutes = () => {
    const currentRoute = routes.find(r => {
      return r.fragment === window.location.hash;
    });
    if (!currentRoute) {
      notFound();
      return;
    }
    currentRoute.component();
  };

  const router = {
    addRoute(fragment, component) {
      routes.push({
        fragment,
        component
      });
      return router;
    },
    setNotFound(cb) {
      notFound = cb;
      return router;
    },
    start() {
      window.addEventListener('hashchange', checkRoutes);
      if (!window.location.hash) {
        window.location.hash = '#/';
      }
      checkRoutes();
    }
  };

  return router;
};

export default createRouter;
