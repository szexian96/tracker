import {initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import firebaseConfig from "./config/firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig); //firebase configuration

const auth = getAuth(firebaseApp); //firebase authentication
const db = getFirestore(firebaseApp); //database

export { auth, db };