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
      // audience: config.audience,
      responseType: ResponseType.Token,

      usePKCE: true,
      codeChallengeMethod: CodeChallengeMethod.S256,

      extraParams: {
        audience: config.audience, // c'est la clé !
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
