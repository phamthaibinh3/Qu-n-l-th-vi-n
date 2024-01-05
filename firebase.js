import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1tVDrXIH6CLuNJqWR6dgWnvrJl-3A9ng",
  authDomain: "doan-cdio-4.firebaseapp.com",
  databaseURL: "https://doan-cdio-4-default-rtdb.firebaseio.com",
  projectId: "doan-cdio-4",
  storageBucket: "doan-cdio-4.appspot.com",
  messagingSenderId: "273526745063",
  appId: "1:273526745063:web:d6d76a0b37db7612797f42",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
