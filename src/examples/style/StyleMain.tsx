import styles from "./style.module.scss";

/**
 * em, rem단위 사용 테스트
 * rem
 *  - 루트 요소의 폰트 크기를 기반.
 * em
 *  - 상위 요소의 글꼴 크기를 기반.
 * 
 * 모범사례
 *  1. 일관된 글꼴 크기 사용
 *      - rem사용 시 루트 요소에 대해 일관된 기본 글꼴 크기를 설정하는 것이 중요.
 *  2. em단위 중첩 피하기
 *      - 깊은 중첩은 글꼴 크기가 복잡해 지고 계산이 어려워짐.
 *  3. 다양한 장치및 화면 크기 테스트
 *      - 
 * @returns 
 */
function StyleMain() {

    return (
        <div className={ styles.container }>
            <div className={ styles.mainContent }>메인컨텐츠</div>
            <div className={ styles.sidebar }>사이드바</div>
        </div>
    )
}

export default StyleMain;