<template>
    <div v-for="event in wishlist" :key="event.id" class="wishlist-item">
        <div class="wishlist-name">
            <h3>{{ event.eventName }}</h3>
            <h4>Club: {{ event.clubName }}, Venue: {{ event.venue }}</h4>
            <br>
        </div>
        <div class="remove-button">
            <button @click="remove(event)">remove from wishlist</button>
        </div>
    </div>

    
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import {useStore} from '../store/store.js'
import { addDoc, collection, deleteDoc, query, doc} from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import { auth } from '../firebaseConfig.js';
import { useRouter } from 'vue-router';
import { where, orderBy, limit, getDocs } from 'firebase/firestore';

const wishlist = ref([]);
const fetchWishlist = async () => {
    try {
        const q = query(collection(db, 'wishlist'),
        orderBy('date')
    );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            wishlist.value.push({id: doc.id, ...doc.data()});
        })

        console.log(wishlist);
    } catch (error) {
        console.log(error);
    }
};

const remove = async (event) => {
    try {   
        const eventId = event.id;
        const eventRef = doc(db, 'wishlist', eventId);

        await deleteDoc(eventRef); 
        console.log("deleted item is: ", eventId);
        wishlist.value = [];
        await fetchWishlist();

    } catch (error) {
        console.log(error);
    }

}
// 
onMounted( async () => {
    await fetchWishlist();
})
</script>

<style>
.wishlist-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* background-color: rebeccapurple; */
}

.wishlist-name{
    left: 2px;
    margin-left: 7px;
    border-bottom: 3px;
    border-color: black;
}

.remove-button{
    margin-right: 20px;
    justify-self: center;
    align-self: center;
}

</style>