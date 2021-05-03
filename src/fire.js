import firebase from 'firebase/app';
import "firebase/auth"

const fire = firebase.initializeApp({
  apiKey: "AIzaSyDpJ6jjpce7XYB8543PLMD_EHowd8i1iFc",
  authDomain: "login-7e330.firebaseapp.com",
  projectId: "login-7e330",
  databaseURL: "https://login-7e330-default-rtdb.firebaseio.com",
  storageBucket: "login-7e330.appspot.com",
  messagingSenderId: "247940545984",
  appId: "1:247940545984:web:b93e55c781db19edb0dc25",
  measurementId: "G-NG8B985G01"
  })
export const auth = fire.auth();
export default fire;
