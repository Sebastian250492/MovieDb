import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCf16TuI3nuCCgTmNHqluva5-ETEzmOVyo",
  authDomain: "movieapp-5f61c.firebaseapp.com",
  databaseURL: "https://movieapp-5f61c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "movieapp-5f61c",
  storageBucket: "movieapp-5f61c.appspot.com",
  messagingSenderId: "389550078713",
  appId: "1:389550078713:web:236f43f61df65169aec028"
};


export const app = initializeApp(firebaseConfig);
export const db = getDatabase();
export const auth = getAuth();

