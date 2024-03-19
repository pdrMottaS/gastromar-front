<script setup lang="ts">
import {ref, onMounted} from 'vue'
import Navbar from '@/components/Navbar.vue';
import api from '@/service/api';
import { RouterLink } from 'vue-router'

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

const evt = ref<Event[]>([])

function formatDate(date:string):string{
    const d = new Date(date);
    const formattedDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    return formattedDate
}

onMounted(()=>{
    api.get('/event')
    .then(res=>{
        evt.value = res.data
    })
})

</script>
<template>
    <Navbar/>
    <div class="content">
        <h1>Eventos Gastromar</h1>
        <el-scrollbar max-height="600px">
            <el-card class="event-card" v-for="x in evt" :key="x.id">
                <div class="event-content">
                    <div>
                        <h3>{{ x.name }}</h3>
                        <h4>Início: {{ formatDate(x.init) }}</h4>
                        <h4>Fim: {{ formatDate(x.finish) }}</h4>
                    </div>
                    <RouterLink :to="'/event/'+x.id">view event</RouterLink>
                </div>
            </el-card>
        </el-scrollbar>
    </div>
</template>
<style>

.content{
    max-width: 1300px;
    margin: 0 auto;
    padding: 2rem;
    font-weight: normal;
}

.event-card{
    margin-bottom: 14px;
}

.event-content{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

</style>