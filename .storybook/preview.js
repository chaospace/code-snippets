//import '@/assets/styles/index.scss';
import GlobalStyle from '@/globalStyle';

import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
// Registers and enables scss language support
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('typescript', typescript);
//SyntaxHighlighter.registerLanguage('jsx', jsx);

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  layout: 'none',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

export const decorators = [
  Story => (
    <>
      <GlobalStyle />
      <div style={{margin: '3em'}}>
        <Story />
      </div>
    </>
  )
];
