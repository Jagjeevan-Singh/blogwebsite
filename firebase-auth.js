// firebase-auth.js

import { auth } from './firebase.js'; // Adjust the path based on your folder structure
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

const provider = new GoogleAuthProvider();

// Function to sign in with Google
const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("User signed in: ", user);
      // Redirect or do something with the signed-in user
      window.location.href = "/dashboard"; // Update this as necessary
    })
    .catch((error) => {
      console.error("Error signing in with Google: ", error.message);
    });
};

// Set up an event listener for the Google Sign-In button
document.getElementById('googleSignInBtn').addEventListener('click', signInWithGoogle);

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
    // You can display user information or update the UI here
  } else {
    console.log("No user is signed in.");
  }
});