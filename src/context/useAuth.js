import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = async (email, password, extraInfo = {}) => {
  const username = extraInfo.username?.trim().toLowerCase();

  const usernameQuery = query(
    collection(db, "users"),
    where("username", "==", username)
  );
  const existing = await getDocs(usernameQuery);
  if (!username || !username.length) {
    throw new Error("Username is required.");
  }
  if (!/^[a-z0-9_]+$/i.test(username)) {
    throw new Error("Username can only contain letters, numbers, and underscores.");
  }
  if (!existing.empty) {
    throw new Error("Username is already taken.");
  }

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email,
    name: extraInfo.firstName || "",
    username: username,
    bio: "New here!",
    location: "Earth",
    preferredLanguage: "English",
    profileImage: "src/assets/profile.jpg",
  });

  return user;
};

export const logoutUser = () => {
  return signOut(auth);
};
