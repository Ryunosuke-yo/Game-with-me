import { initializeApp} from 'firebase/app'
import {getFirestore} from "firebase/firestore/lite"
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCF56lg9NPlUPqVPiSmRD1Z-RRrxHoxSt8",
    authDomain: "game-with-me-4be0b.firebaseapp.com",
    projectId: "game-with-me-4be0b",
    storageBucket: "game-with-me-4be0b.appspot.com",
    messagingSenderId: "975278737050",
    appId: "1:975278737050:web:05026186b22723dba40123",
    measurementId: "G-Q50R6PCP21",
    storageBucket : "gs://game-with-me-4be0b.appspot.com/"
    }

const initializeDB = initializeApp(firebaseConfig)
const db = getFirestore()
const storage = getStorage()

export {initializeDB, db, storage}