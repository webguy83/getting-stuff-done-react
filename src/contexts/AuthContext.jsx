import { useReducer, createContext, useEffect } from 'react';
import { authConfig } from '../firebase/config';

// @ts-ignore
export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const auth = authConfig.getAuth();
    const unsub = authConfig.onAuthStateChanged(auth, (user) => {
      // @ts-ignore
      dispatch({
        type: 'AUTH_IS_READY',
        payload: user,
      });
      unsub();
    });
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
