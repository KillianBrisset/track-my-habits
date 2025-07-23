import React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';

import { useAuthContext } from '../providers/AuthProvider';

export const LoginScreen = () => {
  const { login, accessToken, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenue sur Track My Habits</Text>
      <Button title="Se connecter avec Auth0" onPress={login} disabled={!!accessToken} />
      {accessToken ? (
        <Text style={styles.success}>Connecté !</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  success: {
    marginTop: 12,
    color: 'green',
    fontWeight: 'bold',
  },
});
