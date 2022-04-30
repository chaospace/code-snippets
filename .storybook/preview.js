import '@/assets/styles/index.scss';

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  layout: 'left',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

export const decorators = [
  Story => (
    <div style={{margin: '3em'}}>
      <Story />
    </div>
  )
];
