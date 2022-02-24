import { useEffect, useState } from 'react';
import { authConfig } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  useEffect(() => {
    return function () {
      setIsCancelled(true);
    };
  }, []);

  const logout = async () => {
    setIsPending(true);
    const auth = authConfig.getAuth();
    try {
      await authConfig.signOut(auth);
      dispatch({
        type: 'LOGOUT',
      });
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  return { logout, isPending, error };
};
