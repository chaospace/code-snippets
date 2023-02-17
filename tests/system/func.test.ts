/**
 * style-system 함수 공부
 *
 * style-system 동작 원리
 * - 속성별 파서 함수가 있음.
 * - 속성별 파서 함수는 config를 통해 구성
 * - config를 통해 만들어진 parser함수는 compose를 통해 조합가능.
 * 
 * parser를 통해 스타일이 설정되는 원리는 ?
 * steyld-component에 아래 props를 설정하는 함수동작에 따라
 * parser에서 리턴하는 스타일 값이 적용됨.
//Adapting based on props
const PropsBox = styled.div(props => ({
  background: props.background,
  height: '50px',
  width: '50px'
}));
 */

import isNumber from '@/utils/isNumber';
const assign = Object.assign;
const get = (obj: any, key: any = undefined, fallbackValue: any = undefined) => {
  key = key && key.split ? key.split('.') : [key];
  for (let p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undefined;
  }
  return obj === undefined ? fallbackValue : obj;
};

const merge = (a: any, b: any) => {
  let result = assign({}, a, b);
  for (const key in a) {
    if (!a[key] || typeof b[key] !== 'object') continue;
    assign(result, {
      [key]: assign(a[key], b[key])
    });
  }
  return result;
};

const sort = (obj: any) => {
  const next: any = {};
  Object.keys(obj)
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: 'base'
      })
    )
    .forEach(key => {
      next[key] = obj[key];
    });
  return next;
};

const defaults = {
  breakpoints: [40, 52, 64].map(n => n + 'em')
};
const createMediaQuery = (n: string) => `@media screen and (min-width: ${n})`;
const getValue = (n: any, scale: any = undefined) => get(scale, n, n);

const createStyleFunction = ({
  properties,
  property,
  scale,
  transform = getValue,
  defaultScale
}: any) => {
  properties = properties || [property];
  const sx = (value: any, scale: any, _props: any = undefined) => {
    const result = {};
    console.log('sx---------------');
    console.log('properties', properties, 'value', value, 'scale', scale, '_props', _props);
    const n = transform(value, scale, _props);
    if (n === null) return;
    properties.forEach((prop: any) => {
      result[prop] = n;
    });
    return result;
  };
  //console.log('properties', properties, 'scale', scale);
  sx.scale = scale;
  sx.defauls = defaultScale;
  return sx;
};

const parseResponsiveStyle = (
  mediaQuries: any,
  sx: any = undefined,
  scale: any = undefined,
  raw: any = undefined,
  _props: any = undefined
) => {
  let styles = {};

  //raw.slice(0, mediaQuries.length)
  raw.concat().forEach((value: string, i: number) => {
    console.log('raw-foreach-i', i);
    const media = mediaQuries[i];
    const style = sx(value, scale, _props);
    if (!media) {
      assign(styles, style);
    } else {
      assign(styles, {
        [media]: assign({}, styles[media], style)
      });
    }
  });
  console.log('parseResponsiveStyle-styles', styles);
  return styles;
};

const parseResponsiveObject = (
  breakpoints: any,
  sx: any,
  scale: any = undefined,
  raw: any = undefined,
  _props: any = undefined
) => {
  let styles = {};
  for (let key in raw) {
    const breakpoint = breakpoints[key];
    const value = raw[key];
    const style = sx(value, scale, _props);
    if (!breakpoint) {
      assign(styles, style);
    } else {
      const media = createMediaQuery(breakpoint);
      assign(styles, {
        [media]: assign({}, styles[media], style)
      });
    }
  }
  console.log('parseResponsiveObject-styles', styles);
  return styles;
};

const createParser = (config: any) => {
  const cache: any = {};
  const parse = (props: any) => {
    let styles = {};
    let shouldSort = false;
    const isChacheDisabled = props.theme && props.theme.disableStyledSystemCache;
    for (const key in props) {
      if (!config[key]) continue; // 키가 없으면 스킵!
      const sx = config[key];
      const raw = props[key];
      const scale = get(props.theme, sx.scale, sx.defaults);
      console.log('createParser-----------------\n');
      console.log('key', key, 'props', props, 'raw', raw, 'scale', scale);
      console.log('sx-info', sx.scale, sx.defaults);
      if (typeof raw === 'object') {
        cache.breakpoints =
          (!isChacheDisabled && cache.breakpoints) ||
          get(props.theme, 'breakpoints', defaults.breakpoints);
        if (Array.isArray(raw)) {
          console.log('raw-isArray');
          cache.media = (!isChacheDisabled && cache.media) || [
            null,
            ...cache.breakpoints.map(createMediaQuery)
          ];

          styles = merge(styles, parseResponsiveStyle(cache.media, sx, scale, raw, props));
          // 코드 진행을 멈추기 위한 continue
          continue;
        }

        if (raw !== null) {
          console.log('raw-is-not null');
          styles = merge(styles, parseResponsiveObject(cache.breakpoints, sx, scale, raw, props));
          shouldSort = true;
        }
        continue;
      }
      assign(styles, sx(raw, scale, props));
    }
    // sort object-based responsive styles
    if (shouldSort) {
      styles = sort(styles);
    }
    console.log('styles', styles);
    return styles;
  };
  parse.config = config;
  parse.propNames = Object.keys(config);
  parse.cache = cache;

  const keys = Object.keys(config).filter(k => k !== 'config');

  if (keys.length > 1) {
    keys.forEach(key => {
      parse[key] = createParser({
        [key]: config[key]
      });
    });
  }
  //console.log('parse', parse);
  return parse;
};

const system = (args = {}) => {
  const config = {};
  Object.keys(args).forEach(key => {
    const conf = args[key];
    if (conf === true) {
      config[key] = createStyleFunction({
        property: key,
        scale: key
      });
      return;
    }
    if (typeof conf === 'function') {
      config[key] = conf;
      return;
    }
    config[key] = createStyleFunction(conf);
  });
  //console.log('config', config);
  const parser = createParser(config);
  return parser;
};

describe.skip('get함수 테스트', () => {
  it('get함수 개별 테스트', () => {
    const a = get(
      {
        colors: {
          blue: [1, 2, 3, 4]
        }
      },
      'colors.blue.2'
    );
    console.log('a', a);

    const b = get({}, 'hi', 'nope');
    console.log('b', b);

    const c = get([1, 2, 3], 0);
    console.log('c', c);

    const d = get({}, null);
    console.log('d', d);

    const e = get(['a', 'b', 'c'], 0);
    console.log('e', e);
  });
});

const getWidth = (n: any, scale: any) => {
  console.log('getWidth-n', n, 'scale', scale);
  return get(scale, n, !isNumber(n) || n > 1 ? n : n * 100 + '%');
};

describe.skip('시스템함수 테스트', () => {
  it('parse테스트', () => {
    const a = {
      width: {
        property: 'width',
        scale: 'sizes',
        transform: getWidth
      },
      mx: {
        scale: 'space',
        properties: ['marginLeft', 'marginRight']
      },
      overflow: true
      // minWidth: {
      //   property: 'minWidth',
      //   scale: 'sizes'
      // },
      // height: {
      //   property: 'height',
      //   scale: 'sizes'
      // },
      // size: {
      //   properties: ['width', 'height'],
      //   scale: 'sizes'
      // }
    };
    const layout = system(a);
    console.log('layout', layout);
    const style = layout({
      theme: {
        sizes: [10, 20, 30],
        space: [0, 4, 8, 16, 32]
      },
      width: [0, 1, 2],
      mx: [2, 3, 4]
    });
    console.log('style', style);
  });
});

describe('parse테스트', () => {
  const theme = {
    colors: {
      primary: 'orange',
      secondary: 'blue'
    },
    fontSize: [0, 4, 8, 12]
  };
  const parser = system({
    color: {
      property: 'color',
      scale: 'colors'
    },
    fontSize: true
  });
  it('parse 기본동작', () => {
    const styles = parser({
      theme,
      fontSize: [1, 2, 3],
      color: ['primary', null, 'secondary']
    });
    console.log('styles', styles);
  });
});
