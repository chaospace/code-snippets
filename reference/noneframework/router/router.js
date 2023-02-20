const PARAMETER_REG_EXP = /:(\w+)/g;
const FRAGMENT_REG_EXP = '([^\\/]+)';

const createRouter = () => {
  const routes = [];
  let notFound = () => {};

  const getPathParamsAndMatchingRegexp = path => {
    const params = [];
    const result = path
      .replace(PARAMETER_REG_EXP, (_, paramName) => {
        params.push(paramName);
        return FRAGMENT_REG_EXP;
      })
      .replace(/\//g, '\\/');
    return {params, regexp: new RegExp(`^${result}$`)};
  };

  const extractRouteParams = (route, path) => {
    if (route.params.length == 0) {
      return {};
    }
    const params = {};
    const matches = path.match(route.regexp);
    // 불필요 매칭 정보는 제거
    matches.shift();
    // param정보 추출
    matches.forEach((value, index) => {
      params[route.params[index]] = value;
    });
    return params;
  };

  const checkRoutes = () => {
    const {hash} = window.location;
    const currentRoute = routes.find(r => {
      return r.regexp.test(hash);
    });

    if (!currentRoute) {
      notFound();
      return;
    }

    const params = extractRouteParams(currentRoute, hash);

    currentRoute.component(params);
  };

  const router = {
    addRoute(fragment, component) {
      const {params, regexp} = getPathParamsAndMatchingRegexp(fragment);

      routes.push({
        params,
        regexp,
        fragment,
        component
      });
      return router;
    },
    setNotFound(cb) {
      notFound = cb;
      return router;
    },
    navigate(fragment) {
      window.location.hash = fragment;
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
