
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";


// import { signInWithPopup } from "firebase/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtK5lWFrI1XEfSIWjsvc3YF8Orof9g8sQ",
  authDomain: "zerohate.firebaseapp.com",
  projectId: "zerohate",
  storageBucket: "zerohate.appspot.com",
  messagingSenderId: "944031037274",
  appId: "1:944031037274:web:fb67879e10a5650b79a563",
  measurementId: "G-E0D9D0SKZG"
};


const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const firestore = getFirestore(app);
 const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, firestore, auth, googleProvider };
export default app;