import { useEffect, useState } from 'react';
import { firestoreConfig } from '../firebase/config';

export const useCollection = (col, uid) => {
  const [documents, setDocuments] = useState(null);
  const [isCollectionPending, setIsCollectionPending] = useState(false);
  const [collectionError, setCollectionError] = useState(null);

  useEffect(() => {
    setIsCollectionPending(true);
    const { db, collection, query, onSnapshot } = firestoreConfig;
    const q = query(collection(db, col));

    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        setIsCollectionPending(false);
        setCollectionError(null);
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(docs);
        setCollectionError(null);
      },
      (err) => {
        setIsCollectionPending(false);
        setCollectionError(err.message);
      }
    );
    return () => unsub();
  }, [col, uid]);

  return { documents, isCollectionPending, collectionError };
};
