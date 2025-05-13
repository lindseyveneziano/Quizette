import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = async (email, password, extraInfo = {}) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email,
    name: `${extraInfo.firstName || ""} ${extraInfo.lastName || ""}`.trim(),
    bio: "",
    location: "",
    preferredLanguage: "English",
    profileImage: "",
    points: 0,
    userSince: new Date().getFullYear(),
    quizzesTaken: 0,
    topCategory: "None",
  });

  return user;
};


export const logoutUser = () => {
  return signOut(auth);
};