import isError from './isError';

// axios요청 순차처리 유틸
type AsyncFunc = (args: unknown) => Promise<any>;

async function reduceAxios(actions: AsyncFunc[]) {
  const responses = await actions.reduce(async (result: Promise<unknown[]>, action: AsyncFunc, index: number, arr: AsyncFunc[]) => {
    let resultsArray = await result;
    const value = resultsArray.concat().pop();
    isError(value) && arr.splice(index);
    const response = await action(value && value).catch(e => e);
    resultsArray.push(response);
    return resultsArray;
  }, Promise.resolve([]));
  return responses;
}

export default reduceAxios;
