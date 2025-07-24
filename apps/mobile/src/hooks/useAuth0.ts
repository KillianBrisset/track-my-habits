import {
  CodeChallengeMethod,
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import config from '../config/auth0-configuration';

const scopes = ['openid', 'profile', 'email'];

WebBrowser.maybeCompleteAuthSession();

export type User = {
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string;
  updated_at: string;
  sub: string;
};

export const useAuth0 = () => {
  const discovery = useAutoDiscovery(`https://${config.domain}`) ?? {
    authorizationEndpoint: `https://${config.domain}/authorize`,
    tokenEndpoint: `https://${config.domain}/oauth/token`,
    revocationEndpoint: `https://${config.domain}/oauth/revoke`,
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: config.clientId,
      redirectUri: makeRedirectUri({
        scheme: 'trackmyhabits',
      }),
      responseType: ResponseType.Token,

      usePKCE: true,
      codeChallengeMethod: CodeChallengeMethod.S256,

      extraParams: {
        audience: config.audience,
      },

      scopes,
    },
    discovery
  );

  return {
    request,
    promptAsync,
    response,
  };
};

export const getUserInfo = async (token: string): Promise<User | null> => {
  try {
    const response = await fetch(`https://${config.domain}/userinfo`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Token verification failed');
    }
    const userInfo = await response.json();
    return userInfo ?? null; // If userInfo has a subject, the token is valid
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};

export const sendEmailVerification = async (user_id: string, token: string) => {
  try {
    const response = await fetch(
      `https://${config.domain}/api/v2/jobs/verification-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        body: JSON.stringify({
          user_id,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to resend verification email');
    }
    const data = await response.json();
    console.log('Verification email sent:', data);
    return { success: true };
  } catch (error: any) {
    console.error('Error resending verification email:', error);
    return { success: false, error: error.message };
  }
};
