/**
 * 라우터 파라미터 처리 정규식 테스트
 * www.test.com/a/1/3
 * /a/:id/:subid
 *
 *
 * str.replace(function(match, ...args:정규식과 일치한 항목, offset:매치된 문자열의 index, string:요청한 전체문자열)
 *
 * 라우터 파라미터 추출 과정
 * - 초기 매칭 패턴 정규식을 통해 파라미터 이름 추출및 매칭 정규식 저장.
 * request-url:/user/:id/
 * regexp     :/user\([^\\/]+)/
 * params     :[id]
 *
 * - 라우터 매칭 시 params과 regexp를 이용해 매칭 시 파라미터 값 설정
 */

// 파라미터 영역 매칭 정규식
const parameter_regexp = /:(\w+)/g;
// /가 아닌 모든 문자열 매칭
const url_fragment_regexp = '([^\\/]+)';
describe('정규식을 이용한 파라미터 추출 테스트', () => {
  let params: string[];
  beforeEach(() => {
    params = [];
  });
  /**
   * /list/:id/:subid 패턴에서 파라미터 이름 id, subid를 추출 후
   * /list/([^\\/]+)/([^\\/]+) 로 변경한다.
   * @param fragment
   * @returns
   */
  const fragmentRegexp = (fragment: string) => {
    return `^${fragment
      .replace(parameter_regexp, (match, paramName) => {
        params.push(paramName);
        return url_fragment_regexp;
      })
      .replace(/\//g, '\\/')}$`;
  };

  it.skip('라우터 규칙 /list/:id 에 파라미터 이름은 id가 되야한다.', () => {
    // 파라미터 이름을 추출 후 일반 정규식 패턴으로 변경.
    console.log(`${fragmentRegexp('/list/:id')}`);
    expect(params[0]).toEqual('id');
  });

  it('/list/1/2에서 id는1 subid는2 여야 한다.', () => {
    const extractUrlParams = ({paramNames, regexp}: any, path: string) => {
      if (paramNames.length == 0) {
        return {};
      }
      const resutls = {};
      const matches = path.match(regexp);
      console.log('matches', matches);

      // match결과인 첫 전체 문자열은 제거?
      matches?.shift();

      // 매칭결과에서 파라미터 값을 설정
      matches?.forEach((paramValue, index) => {
        resutls[paramNames[index]] = paramValue;
      });

      return resutls;
    };
    const regexp = new RegExp(fragmentRegexp('/list/:id/:subid'));
    console.log('params', params);
    console.log('results', extractUrlParams({paramNames: params, regexp}, '/list/30/10'));
  });
});
