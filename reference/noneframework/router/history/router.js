// history api를 이용한 router

const INTERVAL_TIME = 200;
const PARAMS_REG_EXP = /:(\w+)/g;
// \/를 제외한 모든 문자와 매칭
const FRAGMENT_REG_EXP = '([^\\/]+)';
const createRouter = () => {
  let notFound = () => {};

  const getRouteParamsAndMatchingRegexp = path => {
    const params = [];
    const r = path
      .replace(PARAMS_REG_EXP, (_, paramName) => {
        params.push(paramName);
        return FRAGMENT_REG_EXP;
      })
      .replace(/\//g, '\\/');
    console.log('r', r);
    return {params, regexp: new RegExp(`^${r}$`)};
  };

  const extractRouteParams = (route, path) => {
    if (route.params.length == 0) {
      return {};
    }

    const matches = path.match(route.regexp);
    matches.shift();

    const params = {};
    matches.forEach((value, index) => {
      params[route.params[index]] = value;
    });

    return params;
  };

  let prevLocation = '';
  const checkRoutes = () => {
    const path = window.location.pathname;
    if (prevLocation === path) {
      return;
    }
    prevLocation = path;
    const currentRoute = routers.find(r => {
      return r.regexp.test(path);
    });

    if (!currentRoute) {
      notFound();
      return;
    }
    const params = extractRouteParams(currentRoute, path);

    return currentRoute.component(params);
  };

  const routers = [];
  const router = {
    addRoute(path, component) {
      const {params, regexp} = getRouteParamsAndMatchingRegexp(path);
      routers.push({
        params,
        regexp,
        path,
        component
      });
      return router;
    },
    navigate(path) {
      console.log('path', path);
      //window.location.pathname = path;
      window.history.pushState(null, null, path);
    },
    setNotFound(cb) {
      notFound = cb;
      return router;
    },
    start() {
      checkRoutes();
      window.setInterval(() => checkRoutes(), INTERVAL_TIME);
      return router;
    }
  };

  return router;
};

export default createRouter;
