import {Optional} from '@/types/types';
import React from 'react';
import {AnyReducer} from './factories';

const STATE_ACTION = {
  CHANGE_AGE: 'CHANGE_AGE',
  CHANGE_NAME: 'CHANGE_NAME',
  UPDATE_IN_ACTION: 'UPDATE_IN_ACTION'
};

type STATE_ACTION_TYPE = typeof STATE_ACTION;
type STATE_ACTION_TYPE_KEY = keyof typeof STATE_ACTION;
type NotiState = {
  name: string;
  age: number;
  action: () => void;
};

type StateAction = {
  type: STATE_ACTION_TYPE_KEY;
  payload: Partial<NotiState>;
};

const stateReducer = (state: NotiState, {type, payload}: StateAction): NotiState => {
  switch (type) {
    case STATE_ACTION.CHANGE_AGE:
      return {...state, age: payload.age!};
    case STATE_ACTION.CHANGE_NAME:
      return {...state, name: payload.name!};
    case STATE_ACTION.UPDATE_IN_ACTION:
      //payload.action();
      if (payload.action) {
        payload.action();
      }
      return state;
    default:
      return state;
  }
};

function ObserverApp() {
  return <div>옵저버 테스트</div>;
}

export {STATE_ACTION, stateReducer};
export default ObserverApp;
