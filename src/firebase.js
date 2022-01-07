// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from "firebase";

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBWP_Zcz4HqrMRNVmwlBMJyPqadeXk23Qc",
    authDomain: "challenge-b5eb8.firebaseapp.com",
    projectId: "challenge-b5eb8",
    storageBucket: "challenge-b5eb8.appspot.com",
    messagingSenderId: "495681946493",
    appId: "1:495681946493:web:a71292a0a7308c27a30214",
    measurementId: "G-RJ65FDYYMP"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };