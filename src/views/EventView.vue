<script setup lang="ts">
import {ref, onMounted} from 'vue';
import api from '@/service/api';
import router from '@/router';
import { useRoute } from 'vue-router';
import formatDate from '@/util/formatDate';
import auth from '@/util/isauth'

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

interface Auth {
    user:string
    token:string
    authorization:string
}

const route = useRoute()
const id = ref()
const evt = ref<Event>()
const centerDialogVisible = ref(false)

const email = ref()
const name = ref()
const celphone = ref()
const num = ref(1)

onMounted(()=>{
    id.value = route.params.id
    if(auth() != null){
        email.value = auth().user
    }
    api.get('/event/'+id.value)
    .then(res=>{
        evt.value = res.data
    })
})

function reservar(){
    api.post('/reservation',
    {
        email:email.value,
        name:name.value,
        celphone:celphone.value,
        num:num.value,
        event_id:id.value
    })
    .then(res=>{
        if(res.status==200){
            router.push('/')
        }
        else{
            alert('Erro ao fazer reserva')
        }
    })
}

</script>
<template>
    <div style="overflow-x: auto;" class="strict">
        <h1>{{ evt?.name }}</h1>
        <h5>Inicio: {{ formatDate(evt?.init) }}</h5>
        <h5>Fim: {{ formatDate(evt?.finish) }}</h5>
        <br/>
        <div v-html="evt?.content"></div>
        <el-button type="primary" @click="centerDialogVisible = true">Reservar</el-button>
    </div>
    <el-dialog
        v-model="centerDialogVisible"
        :title="'Reserva para '+evt?.name"
        width="700"
        align-center
    >
        <p>Nome</p>
        <el-input v-model="name" placeholder="Nome" />
        <p>E-mail</p>
        <el-input v-model="email" placeholder="E-mail" />
        <p>Celular</p>
        <el-input v-model="celphone" placeholder="Celular" />
        <p>Número de pessoas</p>
        <el-input-number v-model="num" :min="1" :max="10" />
        <template #footer>
        <div class="dialog-footer">
            <el-button @click="centerDialogVisible = false">Cancelar</el-button>
            <el-button type="primary" @click="reservar">
            Confirmar
            </el-button>
        </div>
        </template>
    </el-dialog>
</template>