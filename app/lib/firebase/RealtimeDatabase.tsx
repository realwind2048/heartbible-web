'use client'

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  databaseURL: "https://heartbible-db9be-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export async function getHeartBibleVerse(id: number) {
    const heartBibleVersesRef = ref(database, 'heartBibleVerses/' + id);
    return new Promise((resolve, reject) => {
        onValue(heartBibleVersesRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}