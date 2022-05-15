//infer를 이용한 지연처리
//삼항문을 통해 지속적으로 필요 타입을 하나씩 추가해 나간다.
type PathParams<Path extends string> = Path extends `:${infer Param}/${infer Rest}`
  ? Param | PathParams<Rest>
  : Path extends `:${infer Param}`
  ? Param
  : Path extends `${infer _Prefix}:${infer Rest}`
  ? PathParams<`:${Rest}`>
  : never;

type PathArgs<Path extends string> = {[K in PathParams<Path>]: string};

type ValidRoute = `/${string}/:${string}`;

interface Route<Path extends string> {
  path: Path;
  prepare(params: PathArgs<Path>): void;
}

const route = <Path extends string, Routes extends Route<`${Path}${ValidRoute}`>[]>(
  path: Path,
  prepare: (param: PathArgs<Path>) => void,
  ...routes: Routes
) => ({
  path,
  prepare,
  routes
});

const routes = <Str extends string, Elem extends Route<Str>[]>(...elems: [...Elem]) => elems;

const result = [
  route(
    '/dashboard/:siteId',
    arg => {},
    route('/dashboard/:siteId/friend/:id', arg => {}),
    route('/dashboard/:siteId/widgets/:id', arg => {})
  )
];
