import isError from './isError';

// axios요청 순차처리 유틸
type AsyncFunc = (args: unknown) => Promise<any>;

async function reduceAxios(actions: AsyncFunc[]) {
  const responses = await actions
    .reduce(async (result: Promise<unknown[]>, action: AsyncFunc) => {
      let resultsArray = await result;
      const value = resultsArray.concat().pop();
      if (!isError(value)) {
        const response = await action(value && value).catch(e => e);
        resultsArray.push(response);
        return resultsArray;
      }
      return value;
    }, Promise.resolve([]))
    .catch(e => e);
  return responses;
}

export default reduceAxios;
