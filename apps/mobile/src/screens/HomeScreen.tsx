import React from 'react';
import { Button, Text, View } from 'react-native';


export function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenue, tu es connecté !</Text>
      <Button title="Se déconnecter" />
    </View>
  );
}
