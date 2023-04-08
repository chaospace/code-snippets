/**
 * 아코디언 컴포넌트
 */
import {PropsWithChildren, ReactNode, useState} from 'react';
import styles from './style.module.scss';

type AccordionRendererData = {
  header: ReactNode | string;
  content: ReactNode | string;
  expand: boolean;
};

type AccordionProps = {
  provider?: AccordionRendererData[];
};

function CPAccordion({
  provider = [
    {
      header: '아코디언',
      content: '내용...',
      expand: false
    }
  ]
}: PropsWithChildren<AccordionProps>) {
  const [isExpand, setExpand] = useState(false);

  const exapndClass = (isExpand && styles.accordionContentHidden) || '';
  console.log('exapndClass', exapndClass);
  return (
    <ul className={styles.accordionContainer}>
      {provider.map((data, idx) => {
        return (
          <li className={styles.accordionItem} key={idx}>
            <button className={styles.accordionHeader} onClick={() => setExpand(!isExpand)}>
              헤더헤더
            </button>
            <div className={`${styles.accordionContent} ${exapndClass}`}>
              <p>
                It is a long established fact that a reader will be distracted by the readable
                content of a page when looking at its layout. The point of using Lorem Ipsum is that
                it has a more-or-less normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many desktop publishing
                packages and web page editors now use Lorem Ipsum as their default model text, and a
                search for 'lorem ipsum' will uncover many web sites still in their infancy. Various
                versions have evolved over the years, sometimes by accident, sometimes on purpose
                (injected humour and the like).
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CPAccordion;
