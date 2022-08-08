import {PropsWithChildren} from 'react';

function RenderTimerElement({startTime}: PropsWithChildren<{startTime: number}>) {
  console.log('랜더타임-', performance.now() - startTime);

  return null;
}

export default RenderTimerElement;
