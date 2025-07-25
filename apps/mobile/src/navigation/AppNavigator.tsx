import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Appbar } from 'react-native-paper';

import { useAuthContext } from '../providers/AuthProvider';
import { AccountScreen } from '../screens/AccountScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { VerifyEmailScreen } from '../screens/VerifyEmailScreen';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  const { accessToken, isLoading, logout, userInfo } = useAuthContext();

  if (isLoading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );

  if (userInfo && !userInfo.email_verified) {
    return (
      <VerifyEmailScreen />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {accessToken ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({ navigation }) => ({
                header: () => (
                  <Appbar.Header>
                    <Appbar.Content title="Track My Habits" />
                    <Appbar.Action
                      icon="account"
                      onPress={() => navigation.navigate('Account')}
                    />
                    <Appbar.Action icon="logout" onPress={logout} />
                  </Appbar.Header>
                ),
              })}
            />
            <Stack.Screen
              name="Account"
              component={AccountScreen}
              options={{ title: 'Mon compte' }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
