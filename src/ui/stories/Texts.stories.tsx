import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Text} from '@/ui/styled/Texts';
import {TypoProps} from '../styled/types/types';

export default {
  title: 'Example/Text',
  component: Text,
  argTypes: {
    $type: {table: {disable: true}},
    $color: {control: 'color'},
    bold: {control: 'boolean'}
  }
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = args => {
  return <Text {...args} />;
};

const P8 = Template.bind({});
P8.args = {
  children: 'Hello'
};
const P7 = Template.bind({});
P7.args = {
  children: 'Hello',
  $type: 'h7'
};

const P6 = Template.bind({});
P6.args = {
  children: 'Hello',
  $type: 'h6'
};

const P5 = Template.bind({});
P5.args = {
  children: 'Hello',
  $type: 'h5'
};

const P4 = Template.bind({});
P4.args = {
  children: 'Hello',
  $type: 'h4'
};

const P3 = Template.bind({});
P3.args = {
  children: 'Hello',
  type: 'h3'
};

const P2 = Template.bind({});
P2.args = {
  children: 'Hello',
  $type: 'h2'
};

const P1 = Template.bind({});
P1.args = {
  children: 'Hello',
  $type: 'h1'
};

const AllText = (args: TypoProps) => {
  console.log('args', args);
  return (
    <>
      <Text $type="h1" {...args}>
        Hello
      </Text>
      <Text $type="h2" {...args}>
        Hello
      </Text>
      <Text $type="h3" {...args}>
        Hello
      </Text>
      <Text $type="h4" {...args}>
        Hello
      </Text>
      <Text $type="h5" {...args}>
        Hello
      </Text>
      <Text $type="h6" {...args}>
        Hello
      </Text>
      <Text $type="h7" {...args}>
        Hello
      </Text>
      <Text $type="h8" {...args}>
        Hello
      </Text>
    </>
  );
};

export {AllText, P8, P7, P6, P5, P4, P3, P2, P1};
// More on args: https://storybook.js.org/docs/react/writing-stories/args
