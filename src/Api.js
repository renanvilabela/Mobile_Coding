import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';

import { database } from '../config/fb';

const firebasApp = firebase.initializeApp(database);
const db = firebasApp.firestore();

export default{
    
    googlelogar: async () =>{
        const provider = new firebase.auth.GoogleAuthProvider();
    }
}