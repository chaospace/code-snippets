import React, {useCallback, useEffect, useState} from 'react';

/**
 * 상태를 어떻게 가져가야 할까 ?
 *  - 클릭 시 컬러 블루
 *  - 배열 길이가 2가 되면 확인 후 레드 : 블루
 *  - 바로 초기화
 * @param param0
 * @returns
 */
export default function PairButtons({
  data = {
    벨라루스: '민스크',
    불가리아: '소피아',
    이탈리아: '로마',
    대한민국: '서울',
    폴란드: '바르샤바',
    스페인: '마드리드'
  }
}) {
  const [selects, setSelects] = useState([]);
  const [dataProvider, setDataProvider] = useState([]);

  const getAnswers = (selects, objSource) => {
    let answers = ['-', '-'];
    if (selects.length === 2) {
      const answerkey1 = objSource[selects[0]];
      const answerkey2 = objSource[selects[1]];
      if (answerkey1 || answerkey2) {
        answers = answerkey1 ? [answerkey1, selects[0]] : [answerkey2, selects[1]];
      }
    }
    return answers;
  };
  const getCorrects = (selects, answers) => {
    return selects.every(value => answers.indexOf(value) > -1);
  };

  const getInCorrects = (selects, answers) => {
    return selects.some(value => answers.indexOf(value) == -1);
  };

  // 버큰 클릭 핸들러
  const setQuizAnswer = useCallback(
    event => {
      const value = event.currentTarget.value;
      if (selects.length < 2) {
        selects.push(value);
        setSelects([...selects]);
      }
      if (selects.length === 2) {
        const answers = getAnswers(selects, data);
        setTimeout(() => {
          if (getCorrects(selects, answers)) {
            dataProvider.splice(dataProvider.indexOf(answers[0]), 1);
            dataProvider.splice(dataProvider.indexOf(answers[1]), 1);
            setDataProvider([...dataProvider]);
          }
          setSelects([]);
        }, 300);
      }
    },
    [data, selects, dataProvider, setDataProvider, setSelects]
  );

  // 정답여부
  const isInCorrectColor =
    selects.length == 2 ? getInCorrects(selects, getAnswers(selects, data)) : false;

  // 초기화
  useEffect(() => {
    const initProvider = [];
    Object.entries(data).forEach(([key, value]) => {
      initProvider.push(key);
      initProvider.push(value);
    });
    initProvider.sort(() => (Math.random() > 0.4 ? 1 : -1));
    setDataProvider(initProvider);
  }, []);

  return (
    <div>
      {dataProvider.length === 0 ? (
        <h1>congratulations complete!</h1>
      ) : (
        dataProvider.map(value => {
          const isPress = selects.indexOf(value) > -1;
          const bgColor = isPress ? (isInCorrectColor ? '#ff0000' : '#0000ff') : '#aaaaaa';
          return (
            <button
              key={value}
              style={{
                backgroundColor: bgColor
              }}
              value={value}
              onClick={setQuizAnswer}
            >
              {value}
            </button>
          );
        })
      )}
    </div>
  );
}
