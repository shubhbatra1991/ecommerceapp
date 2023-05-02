import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  writeBatch,
  query,
  getDocs, 
} from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyBboPBoNrrSVw3ghnr0qt58dhtNiVkRF4Y",
    authDomain: "my-clothing-app-37a38.firebaseapp.com",
    projectId: "my-clothing-app-37a38",
    storageBucket: "my-clothing-app-37a38.appspot.com",
    messagingSenderId: "788873624359",
    appId: "1:788873624359:web:ade27a76739808081c0702"
  };

  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  
  googleProvider.setCustomParameters({
    prompt: 'select_account',
  });
  
  export const auth = getAuth();

  export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);
    
  export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider);
  
  export const db = getFirestore();

  //Adding values to db on Firestock

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field = 'title' ) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {

      const docRef = doc(collectionRef, object[field].toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');

  };

  // Extracting values from database server and creating a map.
  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  };

  
  export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
  ) => {
    if (!userAuth) return;
  
    const userDocRef = doc(db, 'users', userAuth.uid);
  
    const userSnapshot = await getDoc(userDocRef);
  
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userSnapshot;
  };
  
  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await createUserWithEmailAndPassword(auth, email, password);
  };


  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await signInWithEmailAndPassword(auth, email, password);
  };

  //sign  out user
  export const signOutUser = async () => await signOut(auth);


  //helper function
  export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth, callback);

    export const getCurrentUser = () => {
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
          auth,
          (userAuth) => {
            unsubscribe();
            resolve(userAuth);
          },
          reject
        );
      });
    };