import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

import { useAuthContext } from '../providers/AuthProvider';
import { sendVerificationEmail } from '../services/api';

export const VerifyEmailScreen = () => {
  const { userInfo, accessToken } = useAuthContext();

  const handleResend = async () => {
    try {
      await sendVerificationEmail(accessToken!);
      Alert.alert('Succès', 'Email de vérification envoyé.');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d’envoyer l’email.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vérification de l'email</Text>
      <Text>
        Merci de vérifier votre email ({userInfo?.email}) pour continuer.
      </Text>
      <Text style={styles.success}>
        Un email de vérification a été envoyé. Cliquez sur le lien dans cet email pour activer votre compte.
      </Text>
      <Button title="Renvoyer l'email de vérification" onPress={handleResend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  success: { color: 'green', marginVertical: 10 },  
});
