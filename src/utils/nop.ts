// 유틸 함수 모음
const nop = Symbol.for('nop');
const isNop = (value: unknown): value is typeof nop => value === nop;
export {isNop};
export default nop;
