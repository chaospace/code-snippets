// 객체 속성 클론
const objClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};
