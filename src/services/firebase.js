import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./firebaseConfig"

export const app = initializeApp(firebaseConfig);
export const db = getDatabase();
export const auth = getAuth();

