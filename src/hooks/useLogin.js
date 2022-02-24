import { useEffect, useState } from 'react';
import { authConfig } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  useEffect(() => {
    return function () {
      setIsCancelled(true);
    };
  }, []);

  const login = async (email, password) => {
    setIsPending(true);
    setError(null);
    try {
      const auth = authConfig.getAuth();
      const userCredential = await authConfig.signInWithEmailAndPassword(auth, email, password);

      if (!userCredential) {
        throw new Error('Wrong email/password.');
      }

      const user = userCredential.user;
      dispatch({
        type: 'LOGIN',
        payload: user,
      });
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (!isCancelled) {
        setIsPending(false);
        setError(err.message);
      }
    }
  };

  return { login, isPending, error };
};
