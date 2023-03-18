import {useEffect, useMemo, useState} from 'react';
import styles from './tictactoe.module.scss';
console.log('styles', styles);

function TicTacToe() {
  const [player, setPlayer] = useState('X');
  const [boards, setBoardData] = useState<string[]>(Array(9).fill(''));

  const isEmptyBlock = (id: number) => {
    return boards[id] === '';
  };

  /**
   * 이미 상태를 가진 블럭은 변경이 되면 안됨.
   */
  const onMouseDownGameBlock = useMemo(() => {
    return (id: number) => {
      setBoardData(prev => {
        return prev.map((v, idx) => (idx === id ? player : v));
      });
      setPlayer(prev => (prev === 'X' ? 'O' : 'X'));
    };
  }, [player]);

  /**
   * 완료 여부 체크
   * 가로,세로,대각선에 동일한 값이 있는 플레이어를 승자처리 한다.
   * 모든 경우의 수를 체크해도 되지만 클릭된 블럭 주변만 검사해도 될듯.
   * 블럭 수가 많지 않아 모든 경우에 수를 순회하며 검색
   */
  useEffect(() => {
    const validationList = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let blocks of validationList) {
      const mark = boards[blocks[0]] || '-';
      if (blocks.every(blockID => boards[blockID] === mark)) {
        alert(`winner-${mark}`);
      }
    }
  }, [boards]);

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
              onPointerDown={() => isEmptyBlock(idx) && onMouseDownGameBlock(idx)}
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
