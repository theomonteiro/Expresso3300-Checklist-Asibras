
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getFirestore, collection } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseApp = {
    apiKey: "AIzaSyAlbi5QrlGupPjZyu2fhMbbLmyVim5Ioio", // Get this from your Firebase project settings -> Web app
    authDomain: "expresso3300-checklist-asibras.firebaseapp.com",
    databaseURL: "https://expresso3300-checklist-asibras-default-rtdb.firebaseio.com", // This might vary based on your Realtime Database location
    projectId: "expresso3300-checklist-asibras",
    storageBucket: "expresso3300-checklist-asibras.appspot.com", // Often projectId.appspot.com
    messagingSenderId: "798102647023", // Your Project Number
    appId: "1:798102647023:web:ac24afb8fe57159e11ab1a", // Get this from your Firebase project settings -> Web app
    measurementId: "G-TDS36BLKQ9" // If Google Analytics is enabled for this specific web app
};

const app = initializeApp(firebaseApp);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };