import {ComponentStory, ComponentMeta} from '@storybook/react';
import {HeadLine} from '@/ui/styled/Texts';
import {TypoGraphyStyles} from '@/ui/styled/types/typo';

export default {
  title: 'Example/HeadLine',
  component: HeadLine,
  argTypes: {
    // type: {
    //   options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'],
    //   control: {type: 'select'} // Automatically
    // },
    type: {table: {disable: true}},
    color: {control: 'color'},
    bold: {control: 'boolean'}
  }
} as ComponentMeta<typeof HeadLine>;

const Template: ComponentStory<typeof HeadLine> = args => {
  return <HeadLine {...args} />;
};

const H1 = Template.bind({});
H1.args = {
  children: 'Hello',
  type: 'h1'
};

const H2 = Template.bind({});
H2.args = {
  children: 'Hello',
  type: 'h2'
};

const H3 = Template.bind({});
H3.args = {
  children: 'Hello',
  type: 'h3'
};

const H4 = Template.bind({});
H4.args = {
  children: 'Hello',
  type: 'h4'
};

const H5 = Template.bind({});
H5.args = {
  children: 'Hello',
  type: 'h5'
};

const H6 = Template.bind({});
H6.args = {
  children: 'Hello',
  type: 'h6'
};

const H7 = Template.bind({});
H7.args = {
  children: 'Hello',
  type: 'h7'
};

const H8 = Template.bind({});
H8.args = {
  children: 'Hello',
  type: 'h8'
};
export {H1, H2, H3, H4, H5, H6, H7, H8};
