import React from 'react';
import { Button, Text, View } from 'react-native';

import { useAuth } from '../hooks/useAuth';

export function LoginScreen() {
  const { login } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenue sur Track My Habits</Text>
      <Button title="Se connecter avec Auth0" onPress={() => login()}  />
    </View>
  );
}
