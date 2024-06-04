<template>
    <form @submit.prevent="addEvent">
      <label for="eventName">Event Name:</label>
      <input class="inp" type="text" id="eventName" v-model="eventName" required><br>
      
      <label for="date">Date:</label>
      <input class="inp" type="date" id="date" v-model="date" required><br>
      
      <label for="startTime">Start Time:</label>
      <input class="inp" type="time" id="startTime" v-model="startTime" required><br>
      
      <label for="endTime">End Time:</label>
      <input class="inp" type="time" id="endTime" v-model="endTime" required><br>
      
      <label for="clubName">Club Name:</label>
      <input class="inp" type="text" id="clubName" v-model="clubName" required><br>
      
      <label for="description">Description:</label>
      <textarea class="inp" id="description" v-model="description" required></textarea><br>

      
      <label for="venue">Venue:</label>
      <input class="inp" type="text" id="venue" v-model="venue" required><br>

      <!-- <picture-input 
      ref="imageRef"
      width="60" 
      height="60" 
      margin="16" 
      accept="image/jpeg,image/png" 
      size="10" 
      button-class="btn"
      :custom-strings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Drag a 😺 GIF or GTFO'
      }"
      @change="imageDetails">
    </picture-input> -->
      <label for="thumbnails">Provide Thumbnail of the Event</label>
      <input type="file" @change="uploadImage">
      <img :src="imageURL" v-if="imageURL" alt="couldn't display" style="height: 300px; width: 300px;">

      
      <button class="inp" type="submit">Add Event</button>
    </form>
  </template>
  
  <script setup>
  import { addDoc, collection } from 'firebase/firestore';
  import { db } from '../firebaseConfig.js';
  import {ref, computed, onMounted} from 'vue';
  import { useRouter } from 'vue-router';
  import PictureInput from 'vue-picture-input';
  import {useStore} from '../store/store.js'
  import {getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage';
  import {storage} from '../firebaseConfig.js';

  const eventName = ref('');
  const date = ref('');
  const startTime = ref('');
  const endTime = ref('');
  const clubName = ref('');
  const description = ref('');
  const venue = ref('');
  const router = useRouter();
  const store = useStore();
  const imageURL = ref('');

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    if(!file) return;
    
    const storageReference = storageRef(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageReference, file);

    uploadTask.on('state_changed', (snapshot) => {
      console.log("State changed");
    },
    (error) => {
      console.log(error);
    },
    async () => {
      try {
        console.log("function is in try block");
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        imageURL.value = downloadURL
        // store.image = imageURL.value;
        // console.log(store.image);
      } catch (error) {
        console.log("function in error block");
      }
    })
  }

  const addEvent = async () => {
    try {
      console.log(date.value, " ", endTime.value);
      const docRef = await addDoc(collection(db, 'events'), {
        eventName: eventName.value,
        date: new Date(date.value), // Convert date string to Date object
        startTime: new Date(`${date.value}T${startTime.value}`), // Combine with a dummy date and convert to Date object
        endTime: new Date(`${date.value}T${endTime.value}`), // Combine with a dummy date and convert to Date object
        clubName: clubName.value,
        description: description.value,
        venue: venue.value,
        imageURL: imageURL.value,
      });
      console.log('Event added with ID: ', docRef.id);
      
      // Reset form fields after adding event
      eventName.value = '';
      date.value = '';
      startTime.value = '';
      endTime.value = '';
      clubName.value = '';
      description.value = '';
      venue.value = '';
      imageURL.value = '',

      // push to main events page
      router.push({name: 'home'});
    } catch (error) {
      console.error('Error adding event: ', error);
    }
  };
  </script>

<style>
  .inp{
    margin-top: 3px;
    background-color: rgb(219, 218, 218);
    border-width: 14px;
    border-color: black;
    border-radius: 2px;
  }
</style>
  