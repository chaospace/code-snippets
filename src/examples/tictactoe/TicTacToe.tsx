import {useCallback, useEffect, useMemo, useReducer, useRef, useState} from 'react';
import styles from './tictactoe.module.scss';

/**
 * 히스토리 정보를 문자열 배열로 블록정보 전체를 저장
 * undo와 redo 적용 고민해 보기
 *
 * undo, redo용 배열을 별도로 가질 것인지
 * history인덱스를 관리하며 이동 할 것인가.
 *
 * 인덱스가 변경 후 다시 진행을 하면 현재 인덱스 이후 정보는 제거되며 새로운 값이 들어간다.
 * @returns
 */
function TicTacToe() {
  const [player, setPlayer] = useState('X');
  const [boards, setBoardData] = useState<string[]>(Array(9).fill(''));
  // 기본 히스토리로만 사용하는 단계.
  const history = useRef<{list: string[]; index: number}>({
    list: [],
    index: -1
  }).current;

  const redoIndex = history.list.length - 1 - history.index;
  const undoIndex = history.index;

  const isEmptyBlock = (id: number) => {
    return boards[id] === '';
  };

  /**
   * 이미 상태를 가진 블럭은 변경이 되면 안됨.
   */
  const onMouseDownGameBlock = useMemo(() => {
    return (id: number) => {
      const nextBoards = boards.map((v, idx) => (idx === id ? player : v));
      // redoIndex가 존재하면 이전 히스토리정보 제거
      if (redoIndex > 0) {
        history.list = history.list.slice(0, history.index + 1);
      }
      history.list = [...history.list, nextBoards.join(',')];
      history.index = history.list.length - 1;
      setBoardData(nextBoards);
      setPlayer(prev => (prev === 'X' ? 'O' : 'X'));
    };
  }, [player, boards]);

  /**
   * undo 동작
   *  - history에 마지막 요소를 제거
   *  - history에 정보가 있으면 마지막 정보로 boards설정
   *  - history에 정보가 없으면 boards 초기화
   *  - history정보 갱신
   */
  const onMouseDownUndo = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    history.index -= 1;
    if (history.index < 0) {
      history.index = -1;
    }
    const nextHistory = history.list[history.index];
    const undoData = nextHistory ? nextHistory.split(',') : Array(9).fill('');
    setBoardData(undoData);
  }, []);

  const onMouseDownRedo = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    history.index += 1;
    if (history.index > history.list.length - 1) {
      history.index = history.list.length;
    }
    const nextHistory = history.list[history.index];
    const redoData = nextHistory ? nextHistory.split(',') : Array(9).fill('');
    setBoardData(redoData);
  }, []);

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
    <div className={styles.gameWrapper}>
      <div>
        <h1>current player : {player} </h1>
        <div className={styles.gameContainer}>
          {boards.map((data, idx) => {
            return (
              <button
                className={styles.gameBlock}
                key={idx}
                onPointerDown={() => isEmptyBlock(idx) && onMouseDownGameBlock(idx)}
              >
                {data}
              </button>
            );
          })}
        </div>
      </div>
      <div className={styles.historyContainer}>
        {undoIndex >= 0 && (
          <button className={styles.historyRollbackButton} onPointerDown={onMouseDownUndo}>
            {`undo ${undoIndex + 1}`}
          </button>
        )}
        {redoIndex > 0 && (
          <button className={styles.historyRollbackButton} onPointerDown={onMouseDownRedo}>
            {`redo ${redoIndex}`}
          </button>
        )}
      </div>
    </div>
  );
}

export default TicTacToe;
