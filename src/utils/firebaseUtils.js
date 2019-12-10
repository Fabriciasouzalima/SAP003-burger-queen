import firebase from 'firebase';

const config = {
    
    apiKey: "AIzaSyAtVS4LihVHs8DDntUHiUz6Sp0-s2coEZ0",
    authDomain: "burger-queen-aff55.firebaseapp.com",
    databaseURL: "https://burger-queen-aff55.firebaseio.com",
    projectId: "burger-queen-aff55",
    storageBucket: "burger-queen-aff55.appspot.com",
    messagingSenderId: "653856621681",
    appId: "1:653856621681:web:96a346505f04225f7847d0",
    measurementId: "G-DZ76L7SWZY"

};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();