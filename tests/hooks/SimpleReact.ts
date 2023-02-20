/**
 * 리액트 기본 구성해 보기
 */

export default () => {
  let __hooks: any[] = [];
  let __hooksCount = 0;
  let __effectDeps: any[] = [];
  let __effectInit = false;
  const isFunc = (nValue: any): nValue is Function => typeof nValue === 'function';

  return {
    useState<T>(initialValue: T | (() => T)): [T, (n: T | ((prev: T) => T)) => void] {
      const countRef = __hooksCount++;
      const value = __hooks[countRef] || (isFunc(initialValue) && initialValue()) || initialValue;
      const setValue = (nValue: T | ((state: T) => T)) => {
        __hooks[countRef] = (isFunc(nValue) && nValue(value)) || nValue;
      };
      return [value, setValue];
    },
    useEffect(callback: Function, dependency: any[]) {
      const noDeps = dependency.length === 0;
      const hasChanged = dependency
        ? !dependency.every((o, idx) => Object.is(o, __effectDeps[idx]))
        : false;
      if (hasChanged) {
        callback();
        __effectDeps = dependency;
      } else if (noDeps && !__effectInit) {
        __effectInit = true;
        callback();
      }
      __hooksCount++;
    },
    render(Comp: Function) {
      const comp = Comp();
      console.log(`Comp :: ${Comp.name}`, comp.render());
      __hooksCount = 0;
      return comp;
    }
  };
};
