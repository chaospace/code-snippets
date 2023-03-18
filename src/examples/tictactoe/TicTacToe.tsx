import {useState} from 'react';
import styles from './tictactoe.module.scss';
console.log('styles', styles);

function TicTacToe() {
  const [player, setPlayer] = useState('x');
  const [boards, setBoardData] = useState<string[]>(Array(9).fill(''));
  // 클릭 시 상태 변경 및 플레이어 변경
  const onMouseDownGameBlock = (event: React.PointerEvent<HTMLButtonElement>) => {
    const checkID = event.currentTarget.dataset.id;
    const value = player === 'x' ? 'X' : 'O';
    setBoardData(prev => {
      return prev.map((v, idx) => (idx.toString() === checkID ? value : v));
    });
    setPlayer(prev => (prev === 'x' ? 'o' : 'x'));
  };
  return (
    <div>
      <h1>current player : {player} </h1>
      <div className={styles.gameContainer}>
        {boards.map((data, idx) => {
          return (
            <button
              className={styles.gameBlock}
              key={idx}
              value={data}
              data-id={idx}
              onPointerDown={onMouseDownGameBlock}
            >
              {data}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TicTacToe;
