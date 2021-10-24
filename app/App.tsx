import React from 'react';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

import { Home } from './src/screens/Home';
import { AuthProvider } from './src/hooks/auth';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });

  if (fontsLoaded) {
    return (
      <AuthProvider>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <Home />
      </AuthProvider>
    );
  }

  return <AppLoading />;
}
