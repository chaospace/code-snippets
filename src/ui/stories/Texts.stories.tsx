import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Text} from '../styled/Texts';

export default {
  title: 'Example/Text',
  component: Text,
  argTypes: {
    type: {
      options: ['p12', 'p14', 'p16', 'p18', 'p20', 'p24'],
      control: {type: 'select'} // Automatically
    },
    color: {control: 'color'},
    bold: {control: 'boolean'}
  }
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = args => {
  //const {children, rest} = args;
  console.log('args', args);
  return <Text {...args} />;
};

export const Normal = Template.bind({});
Normal.args = {
  children: 'Hello'
};
// More on args: https://storybook.js.org/docs/react/writing-stories/args
