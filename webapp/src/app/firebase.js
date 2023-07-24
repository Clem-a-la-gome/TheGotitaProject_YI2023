// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmjdyXQWcXP4tJykgCjiCQknwzV_tGQGE",
    authDomain: "the-gotita-project-10b7c.firebaseapp.com",
    projectId: "the-gotita-project-10b7c",
    storageBucket: "the-gotita-project-10b7c.appspot.com",
    messagingSenderId: "305922678799",
    appId: "1:305922678799:web:5b6962d77c67dd8f95037a"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);