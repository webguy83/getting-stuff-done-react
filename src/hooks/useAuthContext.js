import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('This context must be in Auth Context provider');
  }

  return context;
};
