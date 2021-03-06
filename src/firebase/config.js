// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from 'firebase/auth';
import {
  Timestamp,
  serverTimestamp,
  setDoc,
  doc,
  getFirestore,
  updateDoc,
  where,
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAeZ64yenOmSvp0vI958rl98PEygJHRTZc',
  authDomain: 'getting-stuff-done-3aaa0.firebaseapp.com',
  projectId: 'getting-stuff-done-3aaa0',
  storageBucket: 'getting-stuff-done-3aaa0.appspot.com',
  messagingSenderId: '615910943126',
  appId: '1:615910943126:web:0edc0ac7fd0fc024cd95b7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

const authConfig = {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
};

const firestoreConfig = {
  Timestamp,
  serverTimestamp,
  doc,
  setDoc,
  addDoc,
  db,
  updateDoc,
  where,
  collection,
  query,
  onSnapshot,
  deleteDoc,
};

const storageConfig = {
  ref,
  storage,
  getDownloadURL,
  uploadBytesResumable,
};

export { app, authConfig, firestoreConfig, storageConfig };
