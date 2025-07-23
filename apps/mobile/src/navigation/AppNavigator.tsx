import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Appbar } from 'react-native-paper';

import { useAuthContext } from '../providers/AuthProvider';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  const { accessToken, isLoading, logout } = useAuthContext();

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {accessToken ? (
          <Stack.Screen name="Home" component={HomeScreen} options={{
            header: () => {
              return (
                <Appbar.Header>
                  <Appbar.Content title="Track My Habits" />
                  <Appbar.Action icon="logout" onPress={logout} />
                </Appbar.Header>
              );
            }
          }} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
