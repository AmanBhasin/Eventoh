import { defineStore } from "pinia";
import { ref } from "vue";
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';

export const useStore = defineStore('eventStore', () => {
  const state = {
    events: ref([]), // Define a ref for events
    userEmail: ref(''),
    userName: ref(''),
    photoURL: ref(''),
    image: ref(null),
  };

  const actions = {
    async fetchUpcomingEvents() {
      try {
        const q = query(
          collection(db, 'events'),
          where('date', '>=', new Date()),
          orderBy('date'),
        //   limit(6)
        );

        const querySnapshot = await getDocs(q);
        const upcomingEvents = [];
        querySnapshot.forEach((doc) => {
          upcomingEvents.push({ id: doc.id, ...doc.data() });
        });

        // Update the events ref
        state.events.value = upcomingEvents;
        console.log(upcomingEvents);
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
      }
    },


  };

  // Return the state and actions
  return {
    ...state,
    ...actions,
  };
});

export default useStore;
