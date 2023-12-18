import React, { useState, useEffect, useId, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useCookies } from './useCookies';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
const SOCKET_SERVER_URL = 'http://localhost:4000';

interface IMessages {
  senderId: string;
  body: any;
}

const useSocket = (roomId: string) => {
  const socket = io(SOCKET_SERVER_URL, {
    query: { roomId },
  });

  const Id = useId();
  //const socket = manager.socket("/"); // main namespace
  //const adminSocket = manager.socket("/admin"); // admin namespace

  const setConnect = (active: boolean) => {
    active ? socket.connect() : socket.disconnect();
  };
  const saveMessages = useCallback((objText: any) => {
    const arrMessage = objText;
    setMessages(arrMessage);
  }, []);

  const [messages, setMessages] = useState<IMessages>();

  const sendMessage = (text: string) => {
    socket.emit(NEW_CHAT_MESSAGE_EVENT, {
      senderId: 'remote1',
      body: text,
    });
  };

  useEffect(() => {
    socket.on(NEW_CHAT_MESSAGE_EVENT, (message: IMessages) => {
      const incomingMessage = {
        ...message,
      };
      if (message.senderId !== 'remote1') {
        saveMessages(incomingMessage);
      }
    });
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  };

  return { sendMessage, sendPing, setConnect, messages, socket };
};

export default useSocket;
