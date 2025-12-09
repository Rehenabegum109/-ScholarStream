
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBKheOKqPxtbmW_0JLtmZNRn-IlnPbLZs0",
  authDomain: "scholarstream-2dcf9.firebaseapp.com",
  projectId: "scholarstream-2dcf9",
  storageBucket: "scholarstream-2dcf9.firebasestorage.app",
  messagingSenderId: "87716997864",
  appId: "1:87716997864:web:37bf9f71abd8a63032375d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);