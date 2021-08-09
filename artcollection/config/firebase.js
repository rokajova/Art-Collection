import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";
import "firebase/performance";

const firebaseConfig = {
  apiKey: "AIzaSyD9BxDnZTlxmZndlvQgviP6R3vOWpllmV4",
  authDomain: "ai-art-collection.firebaseapp.com",
  projectId: "ai-art-collection",
  storageBucket: "ai-art-collection.appspot.com",
  messagingSenderId: "661442819354",
  appId: "1:661442819354:web:ea2d3dcec3eadd8a1ba8a3",
  measurementId: "G-P970BM7MNJ",
};

try {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase successfully initialized.");
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

export default firebase;
