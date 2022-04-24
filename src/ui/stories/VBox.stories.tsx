import {ComponentStory, ComponentMeta} from '@storybook/react';
import {VBox} from '@/ui/styled/Box';
import {Text} from '@/ui/styled/Texts';
import {Space} from '@/ui/space';

export default {
  title: 'Example/VBox',
  component: VBox,
  argTypes: {
    children: {table: {disable: true}},
    alignItems: {
      options: ['center', 'flex-end', 'flex-start'],
      control: {type: 'select'}
    },
    alignContents: {
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-evenly', 'space-around'],
      control: {type: 'select'}
    },
    bgColor: {control: 'color'},
    gap: {control: 'number'}
  }
} as ComponentMeta<typeof VBox>;

const Template: ComponentStory<typeof VBox> = args => {
  return <VBox {...args} />;
};

const Defualt = Template.bind({});
Defualt.args = {
  children: (
    <>
      <Text $type="h1">VBox Story Example</Text>
      <Text $type="h2">VBox는 요소가 세로로 정렬 됩니다.</Text>
      <Text $type="h3">gap속성 만큼 요소별 공간이 설정됩니다</Text>
      <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" />
    </>
  ),
  gap: Space.s
};

export {Defualt};
