// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwyb-DDXBtxC22SwRiFNsRVbkMp5CijpU",
  authDomain: "gpt-clone-react.firebaseapp.com",
  databaseURL: "https://gpt-clone-react-default-rtdb.firebaseio.com",
  projectId: "gpt-clone-react",
  storageBucket: "gpt-clone-react.appspot.com",
  messagingSenderId: "456774309585",
  appId: "1:456774309585:web:8258dedf117ff1ebe257f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)