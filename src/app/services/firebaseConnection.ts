// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDR0mG1NveO--xfLzo6NaqERs5U_dgb1Ks",
  authDomain: "boardapp-dda56.firebaseapp.com",
  projectId: "boardapp-dda56",
  storageBucket: "boardapp-dda56.appspot.com",
  messagingSenderId: "194909540149",
  appId: "1:194909540149:web:41c5e8a769ecb9a67b067c",
  measurementId: "G-0S5LCG9ZBG"
};
// const firebaseConfig = {
//   apiKey: process.env.APIKEY,
//   authDomain: process.env.AUTHDOMAIN,
//   projectId: process.env.PROJECTID,
//   storageBucket: process.env.STORAGEBUCKET,
//   messagingSenderId: process.env.MESSAGINSENDERID,
//   appId: process.env.APPID,
//   measurementId: process.env.MEASUREMENTID
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log(app)

const db = getFirestore(app)
// console.log(db)

export { db, app }