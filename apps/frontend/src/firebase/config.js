import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";

const isLocalHost = window.location.hostname === "localhost";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: isLocalHost ? import.meta.env.VITE_FIREBASE_AUTH_DOMAIN : "plants-app-front.vercel.app",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//Listener
export const onChangeUser = (setUser) => {
  onAuthStateChanged(auth, (user) => {
    const usuario = user ? user : null
    setUser(usuario)
  })
}

export const onSignOut = () => {
  return signOut(auth)
}

//Firebase guarda token en localstorage.
//Sesion se mantiene aunque cierra nacegador, apague movil, recargue pagina
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error setting persistence:", error)
})

