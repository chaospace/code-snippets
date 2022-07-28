// 타입에 의존한 코드 작성
// declare function jonk<A, B>(
//   ab: (a: A) => B,
//   ann: (an: (a: A) => number) => number
// ): (bn: (b: B) => number) => number;

declare function _<T>(): T;
// function jonk<A, B>(
//   ab: (a: A) => B,
//   ann: (an: (a: A) => number) => number
// ): (bn: (b: B) => number) => number {
//   return _();
// }
function jonk<A, B>(
  ab: (a: A) => B,
  ann: (an: (a: A) => number) => number
): (bnn: (b: B) => number) => number {
  return bn => ann(a => bn(ab(a)));
  //return bn => ann(a => bn(ab(a)));
}

declare function zoop<A, B>(abb: (a: A) => (b: B) => B, b: B, as: Array<A>): B {
  return _();
};
