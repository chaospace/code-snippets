// error인지 아닌지 체크
const isError = (v: unknown) => v instanceof Error;
export default isError;
