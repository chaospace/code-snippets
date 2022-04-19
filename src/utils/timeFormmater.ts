/**
 * 대상 값을 분 : 초 로 변환해 반환
 * @param value
 * @returns
 */
function timeFormatter(value: number) {
  const min = Math.floor(value / 60);
  let sec = Math.floor(value % 60).toString();
  if (+sec < 10) {
    sec = "0" + sec;
  }
  return `0${min} : ${sec}`;
}

export default timeFormatter;
