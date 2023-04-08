/**
 * debounce동작 테스트
 */

/**
 * 연속된 함수 호출 시 wait시간 후 한번만 func실행 되도록 처리하는 함수
 * @param func
 * @param wait
 * @param immediate
 * @returns
 */
const debounce = (func: Function, wait = 20, immediate = true) => {
  let timerID: ReturnType<typeof setTimeout>;

  return (...rest: any[]) => {
    const later = function () {
      clearTimeout(timerID);
      !immediate && func.apply(null, rest);
    };

    const callNow = !timerID && immediate;
    clearTimeout(timerID);
    timerID = setTimeout(later, wait);
    callNow && func.apply(null, rest);
  };
};

describe('디바운드 테스트', () => {
  it('debounce기본 동작', () => {});
});
