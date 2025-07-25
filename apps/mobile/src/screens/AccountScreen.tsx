import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, TextInput, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAuthContext } from '../providers/AuthProvider';

// This screen displays the user's account information with a form to update it
export const AccountScreen = () => {
  const { userInfo, user, isLoading } = useAuthContext();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
  });

  if (isLoading || !userInfo || !user) {
    return <Text>Chargement en cours...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mon Compte</Text>
      {user.profilePicture && (
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.profilePicture}
        />
      )}
      
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}

        value={userInfo?.email || ''}
        editable={false}
      />

      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        value={formData.lastName || ''}
        onChangeText={(text) => setFormData({ ...formData, lastName: text })} // Update last name
        editable={true}
      />
      <Text style={styles.label}>Prénom</Text>
      <TextInput
        style={styles.input}
        value={formData.firstName || ''}
        onChangeText={(text) => setFormData({ ...formData, firstName: text })} // Update first name
        editable={true}
      />

      <Button
        title="Mettre à jour"
        onPress={() => {
          // Handle update logic here
          console.log('Updated data:', formData);
        }}
        disabled={!formData.firstName.trim() || !formData.lastName.trim()}
      />


    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});