import { ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';

import { io } from 'socket.io-client';

import { Message, MessageProps } from '../Message';
import { styles } from './styles';
import { api } from '../../services/api';

const socket = io(String(api.defaults.baseURL));

const messagesQueue: MessageProps[] = [];

socket.on('new_message', (newMessage) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      const response = await api.get<MessageProps[]>('/messages/last');

      setCurrentMessages(response.data);
    }

    fetchMessages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages((prevState) => [
          messagesQueue[0],
          prevState[0],
          prevState[1],
        ]);

        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </ScrollView>
  );
}
