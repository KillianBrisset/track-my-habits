import React from 'react';
import { Button } from 'react-native';

interface AuthButtonProps {
  onPress: () => void;
  disabled?: boolean;
  title?: string;
}

export const AuthButton = ({
  onPress,
  disabled = false,
  title = 'Log In',
}: AuthButtonProps) => {
  return <Button disabled={disabled} title={title} onPress={onPress} />;
};
