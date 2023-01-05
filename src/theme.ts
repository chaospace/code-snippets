// 테마 설정

import {css} from 'styled-components';

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
  input: css`
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

    &:read-only,
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
      width: 20px;
      height: 20px;
      border-radius: 4px;
      background-color: #eee;
      border: 1px solid black;
      margin-left: 8px;
      &::after {
        position: absolute;
        content: '';
        left: 50%;
        top: 50%;
        width: 8px;
        height: 14px;
        border-style: solid;
        border-radius: 0;
        border-width: 0px 3px 2px 0px;
        border-color: transparent;
        transform: rotate(45deg) translate(-60%, -70%);
        transform-origin: top left;
      }
    }
    input[type='checkbox']:checked ~ i::after {
      border-color: red;
    }
  `
};

export default theme;
