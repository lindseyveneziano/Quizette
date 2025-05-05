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
    username: "", // Username will be set later in profile edit
    bio: "",
    location: "",
    preferredLanguage: "English",
    profileImage: "",
    points: 0,
  });

  return user;
};

export const logoutUser = () => {
  return signOut(auth);
};

export const isUsernameTaken = async (username) => {
  if (!username) return true;

  const usernameQuery = query(
    collection(db, "users"),
    where("username", "==", username.toLowerCase())
  );
  const result = await getDocs(usernameQuery);
  return !result.empty;
};
