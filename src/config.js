/**
 * Configure the project Database
 * this code can be copied from firebase at
 * https://console.firebase.google.com/u/1/project/threader-app-8163c/settings/general/web:M2JjMGUwYTktYjA3YS00YmRiLWI1OTUtMDFiOGEwNjIwOWUx
 */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqFTVDX6h2fMqSsvjIRdAqZfkrMqDEDAU",
  authDomain: "threader-app-8163c.firebaseapp.com",
  projectId: "threader-app-8163c",
  storageBucket: "threader-app-8163c.appspot.com",
  messagingSenderId: "1077400049279",
  appId: "1:1077400049279:web:af5dee3ccd6b064e3a914a",
  measurementId: "G-6QQ4CMXDPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
const analytics = getAnalytics(app);