import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAUbz5TP6ELwqTMp-HwOENyLfmlRnU_g_A",
  authDomain: "todo-app-cp-402b8.firebaseapp.com",
  projectId: "todo-app-cp-402b8",
  storageBucket: "todo-app-cp-402b8.appspot.com",
  messagingSenderId: "7940222644",
  appId: "1:7940222644:web:3c43dd8ec8add28231b1e1",
  measurementId: "G-K8MS74VTHL",
});

const db = firebaseApp.firestore();

export default db;
