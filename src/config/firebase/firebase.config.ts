// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzKrf1QFzwW3Y5-OcoU5SInQyuncMAuD4",
  authDomain: "simple-todo-68aa5.firebaseapp.com",
  projectId: "simple-todo-68aa5",
  storageBucket: "simple-todo-68aa5.appspot.com",
  messagingSenderId: "403950498105",
  appId: "1:403950498105:web:4160a55370c489a3c878e8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
