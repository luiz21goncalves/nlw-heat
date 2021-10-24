import React from 'react';
import { Text, View } from 'react-native';

import { MotiView } from 'moti';

import { UserPhoto } from '../UserPhoto';
import { styles } from './styles';

export type MessageProps = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

type Props = {
  message: MessageProps;
};

export function Message({ message }: Props) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 700 }}
      style={styles.container}
    >
      <Text style={styles.message}>{message.text}</Text>

      <View style={styles.footer}>
        <UserPhoto sizes="SMALL" imageUri={message.user.avatar_url} />
        <Text style={styles.userName}>{message.user.name}</Text>
      </View>
    </MotiView>
  );
}
