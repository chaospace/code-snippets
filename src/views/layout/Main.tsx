import GlobalStyle from '@/globalStyle';
import {HBox, VBox} from '@/ui/styled/Box';
import {Link, Outlet} from 'react-router-dom';
import {HeadLine} from '@/ui/styled/Texts';

function Main() {
  return (
    <>
      <GlobalStyle />
      <VBox p={16}>
        <HeadLine>Code-snippets</HeadLine>
        <HBox p={8} gap={8}>
          <ul>
            <li>
              <Link to="/ui/accordion">아코디언</Link>
            </li>
            <li>
              <Link to="/ui/carousel">이미지 슬라이드</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/examples/tictactoe">틱택토 게임</Link>
            </li>
          </ul>
        </HBox>
      </VBox>

      <VBox m={16} gap={16}>
        <Outlet />
      </VBox>
    </>
  );
}

export default Main;
