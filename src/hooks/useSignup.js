import { useEffect, useState } from 'react';
import { authConfig, firestoreConfig, storageConfig } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  useEffect(() => {
    return function () {
      setIsCancelled(true);
    };
  }, []);

  const signup = (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    let user = null;
    let response = null;
    let photoURL = null;

    authConfig
      .createUserWithEmailAndPassword(authConfig.getAuth(), email, password)
      .then((res) => {
        response = res;
        if (!response) {
          throw new Error('Could not signup sorry.');
        }

        user = response.user;

        const path = `thumbnails/${response.user.uid}/${thumbnail.name}`;
        const { ref, getDownloadURL, storage, uploadBytesResumable } = storageConfig;

        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, thumbnail);

        uploadTask.on(
          'state_changed',
          null,
          (err) => {
            setError(err);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => {
                const { setDoc, doc, db } = firestoreConfig;
                photoURL = url;
                return setDoc(doc(db, 'users', user.uid), {
                  online: true,
                  displayName,
                  photoURL,
                });
              })
              .then(() => {
                return authConfig.updateProfile(response.user, {
                  displayName,
                  photoURL,
                });
              })
              .then(() => {
                dispatch({
                  type: 'LOGIN',
                  payload: user,
                });
                if (!isCancelled) {
                  setIsPending(false);
                  setError(null);
                }
              });
          }
        );
      })
      .catch((err) => {
        if (!isCancelled) {
          setIsPending(false);
          setError(err.message);
        }
      });
  };

  return { error, isPending, signup };
};
