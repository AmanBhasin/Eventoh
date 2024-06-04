<template>
<div>
  <nav class="navbar">
    <div class="uppernav">
      <a href="https://www.google.com" style="text-decoration: none;">
        <img src="../assets/logoeventoh.png" alt="logo" class="logo">
      </a>
      <input type="text" v-model="searchedQuery" 
      @input="searchEvent(searchedQuery)"
      placeholder="Search Events" class="search-input">
      <router-link to="/create" class="nav-item">Post Event</router-link>
      <div class="nav-item" @click="showWishlist">Wishlist</div>
      <div class="nav-item" @click="missedEvents">Past Events</div>
      <div class="nav-item profile">
        <p>{{store.userName}}</p>
        {{ console.log(store.userName)}} 
      </div>
    </div>
</nav>


 <!-- events div -->
 <div class="events-grid">
    <div v-for="event in events" :key="event.id" class="event-card">
      <div class="event-image">
        <!-- Assuming you have an image URL in the event object -->
        <img :src="event.imageURL" alt="Event Image">
      </div>
      <div class="event-details">
        <h3>{{ event.eventName }}</h3>
        <h4>{{ event.clubName }}</h4>
        <p>{{ formatDate(event.date) }}</p>
        <p>{{ formatTime(event.startTime) }} - {{ formatTime(event.endTime) }}</p>
        <p>{{ event.venue }}</p>

        
        <button type="button" @click="addToWishlist(event)">Add to Wishlist</button>
        <button @click="removeFromFeed(event)">Remove From Feed</button>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import {useStore} from '../store/store.js'
import { addDoc, collection, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import { auth } from '../firebaseConfig.js';
// import router from '@/router';
import { useRouter } from 'vue-router';


const events = ref([]);
const store = useStore();
const searchedQuery = ref('');
const router = useRouter();
const image = ref();

const removeFromFeed = async (event) => {
  console.log("remove button has been clicked");
  let tempEvents = store.events;
  store.events = tempEvents.filter(e => e!==event);
  events.value = store.events;

  try {
    const eventId = event.id;
    const eventRef = doc(db, 'events', eventId);
    await deleteDoc(eventRef);
    console.log("item removed from feed is: ", event.id);
  } catch (error) {
    console.log("can not remove item from the feed due to:", error);  
  }

}

const addToWishlist = async (event) => {
  try {
      console.log(event.date, " ", event.startTime);
      const docRef = await addDoc(collection(db, 'wishlist'), {
        eventName: event.eventName,
        date: (event.date), // Convert date string to Date object
        startTime: (event.startTime), // Combine with a dummy date and convert to Date object
        endTime: (event.endTime), // Combine with a dummy date and convert to Date object
        clubName: event.clubName,
        description: event.description,
        venue: event.venue,
        wishingUser: store.userEmail,
      });
      console.log('Event added with ID: ', docRef.id);
      
    } catch (error) {
      console.error('Error adding event: ', error);
    }

}

const missedEvents = async() => {
  router.push({name: 'pastEvents'})
}

const searchEvent = (searchedQuery) => {
  events.value = events.value.filter(e => (e.eventName.toLowerCase().includes(searchedQuery.toLowerCase()) || e.clubName.toLowerCase().includes(searchedQuery.toLowerCase())));

  if(!searchedQuery){
    events.value = store.events;
  }
}

const showWishlist = () => {
  console.log("Wishlist function has been called");
  // this will be async function => send and get req from db

  router.push({path: '/wishlist'})
}
// Helper function to format date
const formatDate = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000); // Convert Firestore timestamp to JavaScript Date object
  const day = date.getDate().toString().padStart(2, '0'); // Get day (with leading zero)
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (with leading zero)
  const year = date.getFullYear(); // Get full year

  return `${day}/${month}/${year}`;
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000); // Convert Firestore timestamp to JavaScript Date object

  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  // Pad minutes with leading zero if necessary
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutes} ${ampm}`;
};


onMounted(async () => {
  await store.fetchUpcomingEvents();
  events.value = store.events; 
  store.userName = localStorage.getItem('userName');
  store.userEmail = localStorage.getItem('userEmail');
  store.photoURL = localStorage.getItem('photoURL');
})

</script>

<!--  -->
<style scoped>
.navbar {
  height: 80px; /* Adjust height as needed */
  background-color: #fff; /* White background */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add shadow for depth */
}

.uppernav {
  display: flex;
  align-items: center;
  padding-right: 20px; /* Add padding for spacing */
}

.logo {
  height: 80px; /* Adjust height as needed */
  margin-right: 20px; /* Add margin for spacing */
}

.search-input {
  flex: 1; /* Take remaining space */
  height: 30px;
  padding: 10px; /* Add padding for input */
  border: 1px solid #ccc; /* Add border for input */
  border-radius: 5px; /* Rounded corners */
  font-size: 16px; /* Adjust font size */
  justify-content: center;
}

.nav-item {
  cursor: pointer;
  padding: 10px 20px; /* Add padding for spacing */ /* Add margin for spacing */
  border-radius: 5px; /* Rounded corners */
  transition: background-color 0.3s; /* Smooth transition */
  text-decoration: none;
  color: black;
  
}

.nav-item:hover {
  background-color: #f0f0f0; /* Light gray background on hover */
}

.profile {
  background-color: #007bff; /* Blue background */
  color: #fff; /* White text */
}

.profile:hover {
  background-color: #0056b3; /* Darker blue background on hover */
}

.test{
  background-color: #fea8cd;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.event-card {
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.event-image {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  
}

.event-image img {
  width: 100%;
  height: 100%;
}

.event-details {
  padding: 5px;
}

.event-details h3 {
  margin: 0;
  font-size: 1.5rem;
}

.event-details h4 {
  margin: 5px 0;
  font-size: 1.2rem;
  color: #666;
}

.event-details p {
  margin: 5px 0;
  font-size: 1rem;
}

.event-details button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.event-details button:hover {
  background-color: #0056b3;
}
</style>
