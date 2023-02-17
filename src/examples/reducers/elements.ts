import React from 'react';
import styled, {StyledComponent} from 'styled-components';

const TaskItemLabel = styled.label`
  display: inline-flex;
  flex-direction: row;
  column-gap: 8px;
`;

const TaskItemText = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 180px;
`;

const TaskDeleteButton = styled.button``;

const TaskListItem = styled.li`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  align-items: center;
  margin: 4px 0;
  width: 260px;
  > button {
    margin-left: auto;
  }
`;

const CheckBox = styled.input.attrs({type: 'checkbox'})``;

type CPTodoList = {
  ListItem: StyledComponent<'li', any, {}>;
  Label: StyledComponent<'label', any, {}>;
  TextField: StyledComponent<'span', any, {}>;
  Button: StyledComponent<'button', any, {}>;
  CheckBox: StyledComponent<'input', any, {}>;
};
const TodoList: CPTodoList = {
  ListItem: TaskListItem,
  Label: TaskItemLabel,
  TextField: TaskItemText,
  Button: TaskDeleteButton,
  CheckBox
};

const TodoInputText = styled.input.attrs({type: 'text'})`
  padding: 8px 16px;
`;

export {TodoInputText};
export default TodoList;
