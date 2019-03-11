import {firebase} from 'firebase'


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAP26LDfU4OMnpBTB4P9Lm9-c_BgF1DxUQ",
  authDomain: "prolike-stack.firebaseapp.com",
  databaseURL: "https://prolike-stack.firebaseio.com",
  projectId: "prolike-stack",
  storageBucket: "prolike-stack.appspot.com",
  messagingSenderId: "320832304478"
});


export const firestore = firebaseApp.firestore()
