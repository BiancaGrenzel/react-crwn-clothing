import firebase from 'firebase/app';

import 'firebase/firestore';

import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBfmkCuFyNSHa7TTolbMt18wnbtPUGvr7Q",
    authDomain: "bgs-crwn-db.firebaseapp.com",
    projectId: "bgs-crwn-db",
    storageBucket: "bgs-crwn-db.appspot.com",
    messagingSenderId: "648143394212",
    appId: "1:648143394212:web:4f82e8714cefd799135d31",
    measurementId: "G-M5NEWWCP1Z"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!usersAuth) return;

    const userRef = firestore.doc(`users/${userAuth.id}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const { displayName, email } = userAuth;

      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch (error){
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle= () => auth.signInWithPopup(provider);

  export default firebase;