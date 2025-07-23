import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAuthContext } from '../providers/AuthProvider';
import axios from 'axios';

export const AccountScreen = () => {
  const { accessToken } = useAuthContext();
  const [profile, setProfile] = useState<any | null>(null);

  useEffect(() => {
    if (accessToken) {
      axios
        .get('https://dev-pmy2361regvfitwf.us.auth0.com/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => setProfile(res.data))
        .catch(() => setProfile(null));
    }
  }, [accessToken]);

  return (
    <View style={styles.container}>
      {profile ? (
        <>
          <Text style={styles.title}>{profile.name}</Text>
          <Text>{profile.email}</Text>
        </>
      ) : (
        <Text>Chargement du profil...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 20, marginBottom: 8 },
});
