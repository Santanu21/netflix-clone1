import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5HGGANToIaBPj7ZYoXJRkZV4tRyFEFVM",
  authDomain: "netflix-clone-5652d.firebaseapp.com",
  projectId: "netflix-clone-5652d",
  storageBucket: "netflix-clone-5652d.firebasestorage.app",
  messagingSenderId: "157894471363",
  appId: "1:157894471363:web:c17235e73b8b094c8e3c76",
  measurementId: "G-4FJMV18BJD"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);