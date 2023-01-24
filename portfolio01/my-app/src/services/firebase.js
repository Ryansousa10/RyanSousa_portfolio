// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9KvwZdZq07mK4UcctSiattbB7_qWX-mk",
  authDomain: "estudo-crud-93147.firebaseapp.com",
  databaseURL: "https://estudo-crud-93147-default-rtdb.firebaseio.com",
  projectId: "estudo-crud-93147",
  storageBucket: "estudo-crud-93147.appspot.com",
  messagingSenderId: "250436881390",
  appId: "1:250436881390:web:402a2887e4f74a5de35cff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
