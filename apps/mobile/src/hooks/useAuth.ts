import { useAuth0 } from 'react-native-auth0';
import config from '../auth0-configuration';

export const useAuth = () => {
  const { authorize, clearSession, user, error, getCredentials, isLoading } =
    useAuth0();

const login = async () => {
    try {
      await authorize({ audience: config.audience });
      let credentials = await getCredentials();
      Alert.alert('AccessToken: ' + credentials.accessToken);
    } catch (e) {
      console.log(e);
    }
  };


  const loggedIn = user !== undefined && user !== null;

  const logout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  };
  return {
    login,
    loggedIn,
    user,
    error,
    isLoading,
    logout,
  };
};
