// @ts-nocheck
import { useEffect, useReducer, useState } from 'react';
import { firestoreConfig } from '../firebase/config';

const initState = {
  document: null,
  isPending: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, error: null };
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, error: null };
    case 'DELETE_DOCUMENT':
      return { isPending: false, document: null, error: null };
    case 'UPDATED_DOCUMENT':
      return { isPending: false, document: action.payload, error: null };
    case 'ERROR':
      return { isPending: false, document: null, error: action.payload };
    default:
      return state;
  }
};

export const useFirestore = (col) => {
  const [response, dispatch] = useReducer(reducer, initState);
  const [isCancelled, setIsCancelled] = useState(false);

  const dispatchIfNoCancelled = (actionAndPayload) => {
    if (!isCancelled) {
      dispatch(actionAndPayload);
    }
  };

  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const addedDoc = await firestoreConfig.addDoc(
        firestoreConfig.collection(firestoreConfig.db, col),
        { ...doc, createdAt: firestoreConfig.serverTimestamp() }
      );
      dispatchIfNoCancelled({ type: 'ADDED_DOCUMENT', payload: addedDoc });
    } catch (err) {
      dispatchIfNoCancelled({ type: 'ERROR', payload: err.message });
    }
  };
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      await firestoreConfig.deleteDoc(firestoreConfig.doc(firestoreConfig.db, col, id));
      dispatchIfNoCancelled({ type: 'DELETE_DOCUMENT' });
    } catch (err) {
      dispatchIfNoCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' });
    const { doc, updateDoc, db } = firestoreConfig;
    const ref = doc(db, col, id);

    try {
      const updatedDocument = await updateDoc(ref, updates);
      dispatchIfNoCancelled({ type: 'UPDATED_DOCUMENT', payload: updatedDocument });
    } catch (err) {
      dispatchIfNoCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, updateDocument, deleteDocument, response };
};
