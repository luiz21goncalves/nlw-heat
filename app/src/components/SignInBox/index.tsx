import { View } from 'react-native';
import React from 'react';

import { Button } from '../Button';
import { COLORS } from '../../theme';
import { styles } from './styles';
import { useAuth } from '../../hooks/auth';

export function SignInBox() {
  const { signIn, isSigningIn } = useAuth();

  return (
    <View style={styles.container}>
      <Button
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        title="Entrar com o github"
        icon="github"
        onPress={signIn}
        isLoading={isSigningIn}
      />
    </View>
  );
}
