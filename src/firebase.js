/* Firebase */
import firebase from 'firebase/app'; // firebase core
import 'firebase/firestore' // db
import 'firebase/auth' // auth


firebase.initializeApp({
  apiKey: "AIzaSyAxiryizTTWs__o8DDnGC9bJFQXyaScD1A",
  authDomain: "starterproject-swehu.firebaseapp.com",
  databaseURL: "https://starterproject-swehu.firebaseio.com",
  projectId: "starterproject-swehu",
  storageBucket: "starterproject-swehu.appspot.com",
  messagingSenderId: "853080662051",
  appId: "1:853080662051:web:00f1497fc144995e50d196"
});

const firestore = firebase.firestore();
const auth = firebase.auth();

export { firebase, firestore, auth };