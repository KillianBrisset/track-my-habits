import React from 'react';

import { AppNavigator } from './navigation/AppNavigator';
import { AuthProvider } from './providers/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      
      <AppNavigator />
    </AuthProvider>
  );
}
