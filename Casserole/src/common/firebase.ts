import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDqxuQsfcIoNTjfFhfsVN6t6M1PJVchtfY",
    authDomain: "photo-dump-787f3.firebaseapp.com",
    projectId: "photo-dump-787f3",
    storageBucket: "photo-dump-787f3.appspot.com",
    messagingSenderId: "277242271894",
    appId: "1:277242271894:web:0690850224984466dd8ab7",
    measurementId: "G-XK2DC34M00"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const Auth = firebase.auth();
export const Firestore = firebase.firestore();