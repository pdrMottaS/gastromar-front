<script setup lang="ts">
import {ref, onMounted} from 'vue';
import api from '@/service/api';
import { useRoute } from 'vue-router';

interface Reservation {
    email:string
    name:string
    celphone:string
    num:number
    event_id:number
}

interface Event {
    name:string
    init:string
    finish:string
    content:string
    value:number
    max_person:number
    id:number
    reservation:Reservation[]
}

const route = useRoute()
const id = ref()
const evt = ref<Event>()

onMounted(()=>{
    id.value = route.params.id
    console.log(id.value)
    api.get('/event/'+id.value)
    .then(res=>{
        evt.value = res.data
        console.log(evt.value)
    })
})


</script>
<template>
    <div class="strict" v-html="evt?.content">
    </div>
</template>