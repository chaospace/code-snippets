// 테마 설정

import { css } from 'styled-components';
import { adjustHexColor } from './helper/styleHelper';

const colors = {
  disabled: '#d7d7d7',
  disabledDarken: adjustHexColor('#d7d7d7', 20)
};

const theme = {
  button: css`
    background: none;
    user-select: none;
    border: none;
    background-color: #999;
    box-shadow: 1px 1px 1px black;
    padding: 0.5rem 1rem;
    &:hover {
      background-color: #666;
    }
  `,
  select: css`
    outline: none;
    border-width: 1px;
    border-color: black;
    border-style: solid;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: white;

    &:focus {
      border-color: #2196f3;
      outline: 1px solid #2196f3;
    }

    &:disabled {
      color: gray;
      background-color: #eee;
      border-color: #ccc;
      outline: 1px solid #eee;
      pointer-events: none;
    }

    &.invalid,
    &.invalid:focus {
      border-color: red;
      background-color: #ffcbcb;
      outline: 1px solid red;
    }
  `,
  checkbox: css`
    position: relative;
    font-size: 16px;
    input[type='checkbox'] {
      position: absolute;
      clip: rect(0, 0, 0, 0);
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
    i {
      position: relative;
      display: inline-flex;
      width: 1.4em;
      height: 1.4em;
      border-radius: 0.3em;
      background-color: #eee;
      border: 1px solid ${adjustHexColor('#eeeeee', -40)};
      margin-left: 8px;
      &::after {
        position: absolute;
        content: '';
        left: 50%;
        top: 50%;
        width: 0.6em;
        height: 0.8em;
        border-style: solid;
        border-radius: 0;
        border-width: 0px 0.2em 0.1em 0px;
        border-color: transparent;
        transform: rotate(45deg) translate(-60%, -70%);
        transform-origin: top left;
      }
    }
    input[type='checkbox']:checked ~ i::after {
      border-color: #000;
    }
  `,
  radio: css`
    position: relative;
    display: flex;
    align-items: end;
    font-size: 16px;
    input[type='radio'] {
      appearance: none;
      margin: 0 4px;
      padding: 0;
      width: 1.4em;
      height: 1.4em;
      border-radius: 50%;
      border: 2px solid;
      border-color: gray;
      background-color: white;
      transition: 0.3s ease-out;
      transition-property: border;
      &:disabled {
        background-color: ${colors.disabled};
        border-color: ${colors.disabledDarken};
      }

      &:disabled ~ span {
        color: ${colors.disabled};
      }

      &:checked {
        border-width: 0.4em;
        background-color: #ffcbcb;
      }
    }
  `
};
export { colors };
export default theme;
