// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbfkVsWMpwd15k27bYhPL4u6KUxjdNTJ0",
  authDomain: "kasi-transie-8fa02.firebaseapp.com",
  projectId: "kasi-transie-8fa02",
  storageBucket: "kasi-transie-8fa02.firebasestorage.app",
  messagingSenderId: "39144806688",
  appId: "1:39144806688:web:7ea365e28473637b029f45",
  measurementId: "G-LSYT4SYF0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { db };
export { auth };