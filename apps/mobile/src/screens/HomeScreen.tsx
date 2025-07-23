import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';

import { useAuthContext } from '../providers/AuthProvider';
import { getHabits } from '../services/api';

export function HomeScreen() {
  const { accessToken, logout } = useAuthContext();
  const [habits, setHabits] = useState<any[]>([]);

  useEffect(() => {
    if (accessToken) {
      getHabits(accessToken)
        .then(res => setHabits(res.data))
        .catch(console.error);
    }
  }, [accessToken]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Se déconnecter" onPress={logout} />
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Mes habitudes</Text>
      <FlatList
        data={habits}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
      {/* Ajoute ici bouton pour créer/modifier/supprimer des habitudes */}
    </View>
  );
}
