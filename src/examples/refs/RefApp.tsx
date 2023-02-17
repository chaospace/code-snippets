import {useRef} from 'react';

function RefApp() {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>인풋 포커스</button>
    </div>
  );
}

export default RefApp;
