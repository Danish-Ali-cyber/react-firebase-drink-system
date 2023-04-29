//This is a configuration file for Firebase, which is a cloud-based platform for building different applications.

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseApp  = firebase.initializeApp({
    apiKey: "AIzaSyBsRpNAvWSAzECXjYhcvdKpCOITDyp43tI",
    authDomain: "beverage-app-eee47.firebaseapp.com",
    projectId: "beverage-app-eee47",
    storageBucket: "beverage-app-eee47.appspot.com",
    messagingSenderId: "219602997274",
    appId: "1:219602997274:web:bbd281a2136eb04f6b41a3"
});

const db = firebaseApp.firestore();
export default db;