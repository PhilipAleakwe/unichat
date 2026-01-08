
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "unichat-973d9.firebaseapp.com",
  projectId: "unichat-973d9",
  storageBucket: "unichat-973d9.firebasestorage.app",
  messagingSenderId: "316632474038",
  appId: "1:316632474038:web:450989d9baa80c4838a117"
};

const app = getApps.length == 0 ? initializeApp(firebaseConfig) : getApp();
const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export { auth, db };

