/**
 * effect의 lifeCycle
 * 컴포넌트의 라이프사이클과 다르게
 * effect는 싱크시작과 싱크 종료만 존재
 */

import {VBox} from '@/ui/styled/Box';
import {HeadLine, Text} from '@/ui/styled/Texts';
import {FormEvent, PropsWithChildren, useEffect, useState} from 'react';

const createConnection = (serverUrl: string, roomId: string) => {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
};

const ChatRoom = ({roomId}: PropsWithChildren<{roomId: string}>) => {
  useEffect(() => {
    const {connect, disconnect} = createConnection(window.location.pathname, roomId);
    connect();
    return disconnect;
  }, [roomId]);

  return <HeadLine>Welcome to the {roomId} room!</HeadLine>;
};

const roomList = ['normal', 'tesla', 'auto-grid', 'sun-set'];

function ChatApp() {
  const [roomId, setRoomId] = useState('normal');

  return (
    <VBox gap={8}>
      <label>
        choose the chat room :{' '}
        <select
          value={roomId}
          onChange={(e: FormEvent<HTMLSelectElement>) => {
            setRoomId(e.currentTarget.value);
          }}
        >
          {roomList.map(v => (
            <option value={v}>{v}</option>
          ))}
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </VBox>
  );
}

export default ChatApp;
