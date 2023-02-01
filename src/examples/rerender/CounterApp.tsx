import {HBox, VBox} from '@/ui/styled/Box';
import {useState} from 'react';
import styled from 'styled-components';
import {Text} from '@/ui/styled/Texts';

const CounterBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 6px;
  padding: 30px 10px;
  min-height: 110px;
`;

function Counter({person}: {person: string}) {
  const [count, setCount] = useState(0);

  return (
    <CounterBox>
      <span>{person}</span>
      <strong>{count}</strong>
      <button onClick={() => setCount(count + 1)}>increase</button>
    </CounterBox>
  );
}

function CounterApp() {
  const [showFirst, toggleItem] = useState(false);

  return (
    <HBox>
      <VBox gap={8}>
        <Text>
          동일한 컴포넌트로 보이지만 react에 랜더링 방식에 따라
          <br />
          key를 이용한 컴포넌트는 속성 변경 시 랜더링이 다시 되어 상태값이 초기화 됨.
        </Text>
        <HBox height={110} gap={8}>
          <Counter person={showFirst ? 'user' : 'player'} />
          <Counter key={showFirst ? 'user' : 'player'} person={showFirst ? 'user' : 'player'} />
        </HBox>
        <label>
          person속성 변경
          <input type="checkbox" onClick={() => toggleItem(prev => !prev)} />
        </label>
      </VBox>
    </HBox>
  );
}

export default CounterApp;
