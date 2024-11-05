import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEHoCNTlm81Jg7yx5CiSIpcJCWr2PhNXU",
  authDomain: "jr-tech-inc-blog.firebaseapp.com",
  projectId: "jr-tech-inc-blog",
  storageBucket: "jr-tech-inc-blog.appspot.com",
  messagingSenderId: "796142961854",
  appId: "1:796142961854:web:5e7c4b7084e0b0df1c4aef",
  measurementId: "G-VN4F5Q2DCP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Initialize Analytics if supported
let analytics;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.log("Analytics not supported in this environment:", error.message);
}

const auth = getAuth(app);

export { auth };