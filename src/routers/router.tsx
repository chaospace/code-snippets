import ContextApp from '@/examples/context/ContextApp';
import PortalTestArea from '@/examples/portal/TestPortal';
import ReducerApp from '@/examples/reducers/ReducerApp';
import CounterApp from '@/examples/rerender/CounterApp';
import StyleMain from '@/examples/style/StyleMain';
import TicTacToe from '@/examples/tictactoe/TicTacToe';
import Carousel from '@/examples/ui/Carousel';
import CPAccordion from '@/ui/accordion/CPAccordion';
import Main from '@/views/layout/Main';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: 'examples',
        children: [
          {
            path: 'portal',
            element: <PortalTestArea />
          },
          {
            path: 'couter',
            element: <CounterApp />
          },
          {
            path: 'context',
            element: <ContextApp />
          },
          {
            path: 'reducer',
            element: <ReducerApp />
          },
          {
            path: 'tictactoe',
            element: <TicTacToe />
          },
          {
            path: 'style',
            element: <StyleMain />
          }
        ]
      },
      {
        path: 'ui',
        children: [
          {
            path: 'accordion',
            element: <CPAccordion />
          },
          {
            path: 'carousel',
            element: <Carousel />
          }
        ]
      }
    ]
  }
]);

export default router;
