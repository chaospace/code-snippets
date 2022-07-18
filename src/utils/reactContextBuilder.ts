import React from 'react';
// react context 생성
function build<T>() {
  const context = React.createContext<T>(null as any);
  function useCustomContext() {
    const c = React.useContext(context);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCustomContext, context.Provider, context.Consumer] as const;
}

export default build;
