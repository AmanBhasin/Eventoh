<template>
    <div>
        This is the page for past events
        
        <div v-for="(event) in pastEvents" :key="event.id">
            <h3>{{ event.eventName }}</h3>
            <h4>{{ event.clubName }}</h4>
            <p>{{ event.venue }}</p>
            <a href="/home">media coverage</a>
            <br>
            <br>
        </div>
    </div>
</template>

<script setup>
import { db } from "../firebaseConfig.js";
import { ref, onMounted } from 'vue';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';


const pastEvents = ref([]);

const fetchPastEvents = async () => {
    try {
        const q = query(collection(db, 'events'),
                        where('date', '<', new Date()),
                        orderBy('date', 'desc')
    );

        const querySnapshot = await getDocs(q);
        const pastEve = [];
        querySnapshot.forEach(doc => {
            pastEve.push({id: doc.id, ...doc.data()});
        });

        pastEvents.value = pastEve;
    } catch (error) {
        console.log("error fetching past events: ", error);
    }
}

onMounted(async() => {
    await fetchPastEvents();
})

</script>

<style>
</style>