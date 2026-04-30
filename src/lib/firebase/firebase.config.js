import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.NEXT_PUBLIC_APIKEY,
  authDomain: import.meta.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: import.meta.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: import.meta.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: import.meta.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: import.meta.env.NEXT_PUBLIC_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
