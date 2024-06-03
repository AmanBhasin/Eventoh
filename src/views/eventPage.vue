<template>
    <div >
        {{ str }}
        <br>
        {{ f }}
    </div>
</template>

<script setup>
import HelloWorld from '@/components/HelloWorld.vue';
import { googleAuthCodeLogin } from 'vue3-google-login';


let str = "Ohell"
str = str.slice(1) + str.slice(0,1)
const f =  str.toLowerCase().includes('o')
// promises

</script>

<style>

</style>