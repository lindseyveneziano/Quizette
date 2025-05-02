import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAdQw1HN5mZcEtSoYKrdDkZ6ZTQi0Lctt8",
    authDomain: "quizette-7da11.firebaseapp.com",
    projectId: "quizette-7da11",
    storageBucket: "quizette-7da11.appspot.com",
    messagingSenderId: "947374193457",
    appId: "1:947374193457:web:0c9e268df9cddb6ff8ce10"
  };
  

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
