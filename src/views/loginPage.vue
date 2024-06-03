<template>
  <div>
    <!-- <GoogleLogin :callback="callback" /> -->

    <!-- <input type="email" v-model="email" placeholder="email"> -->
    <!-- <input type="password" v-model="password" placeholder="password"> -->
    <button @click="signInWithGoogle">submit</button>
    <!-- <button @click="signIn">email signin</button> -->
    <!-- <button @click="insertDB">check db working</button> -->
    <br><br>
    <button >signIn as Guest!</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'; // Import ref for reactive data
import { decodeCredential } from 'vue3-google-login'
// import firebase from 'firebase/app'; // Import Firebase core module
// import  'firebase/auth'; // Import Firebase Authentication module
import { auth, db } from '../firebaseConfig.js'
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword
  , GoogleAuthProvider, GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { collection, addDoc } from 'firebase/firestore';
import {useStore} from '../store/store.js'
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const provider = new GoogleAuthProvider();
const store = useStore();
const router = useRouter();
  const signInWithGoogle = async () => {
    try {
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const credentials = GoogleAuthProvider.credentialFromResult(result);
      console.log(result.user, " ", credentials.accessToken);
      email.value = result.user.email;
      // store.userEmail = email.value;
      // store.userName = result.user.displayName;
      // store.photoURL = result.user.photoURL;
      localStorage.setItem('userName', result.user.displayName);
      localStorage.setItem('userEmail', result.user.email);
      localStorage.setItem('photoURL', result.user.photoURL);
      if(result){
        // redirect to homepage
        
        router.push({path: '/home'});
      }
    } catch (error) {
      console.log(error);
    }
  }

const insertDB = async () => {
  try {
    console.log("Function Started!!");
    const docRef = await addDoc(collection(db, "events"), {
      eventName: "bands",
      date: new Date("2024-05-30"), // Assuming date is in YYYY-MM-DD format
      startTime: new Date("2024-05-09T18:15:00"), // Assuming time is in HH:MM:SS format
      endTime: new Date("2024-05-09T21:03:00"), 
      clubName: "vibes club",
      description: "yo yo yo...",
      venue: "oat"

    });
    console.log("Document written with ID: ", docRef.id);
    console.log("Function Ended");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const signIn = async () => {
  try {
    const auth = getAuth();
    const userCredentials = await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log(userCredentials.user, " ", userCredentials);
  } catch (error) {
    console.log(error);
  }


};

const callback = (response) => {
  const userData = decodeCredential(response.credential)
  console.log("Handle the userData", userData)
}
</script>

<style></style>

<!-- store the info there annd push it from there only, that can be done -->