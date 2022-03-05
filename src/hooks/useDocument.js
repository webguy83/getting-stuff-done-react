import { useEffect, useState } from 'react';
import { firestoreConfig } from '../firebase/config';

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { db, doc, onSnapshot } = firestoreConfig;

    const unsub = onSnapshot(
      doc(db, collection, id),
      (doc) => {
        if (doc.data()) {
          setDocument({ ...doc.data(), id: doc.id });
          setError(null);
        } else {
          setError('No such document exists okay? :)');
        }
      },
      (err) => {
        setError(err.message);
      }
    );

    return () => unsub();
  }, [collection, id]);

  return { document, error };
};
