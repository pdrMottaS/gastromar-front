<script setup lang="ts">
import { ref } from 'vue'
import api from '@/service/api';
import router from '@/router';

const name = ref()
const email = ref()
const password = ref()
const confirm_password = ref()

function register(){
    if(password.value == confirm_password.value){
        api.post('/auth/register',{
            name:name.value,
            email:email.value,
            password:password.value,
            enabled:true,
            authorities:{
                authority:"ROLE_USER"
            }
        }).then(res=>{
            if(res.status == 200){
                alert("Usuário cadastrado")
                router.push('/login')
            }else{
                alert("Falha ao criar usuário, tente novamente mais tarde !")
            }
        })
    }else{
        alert("Senhas não coincidem!")
    }
}

</script>
<template>
    <div class="strict">
        <div class="login-container">
        <div class="login-content">
            <div class="head-content">
            <h1>Cadastro</h1>
            </div>
            <div class="form-content">
                <p>Nome</p>
                <el-input v-model="name" placeholder="Nome" />
                <p>E-mail</p>
                <el-input v-model="email" placeholder="E-mail" />
                <p>Senha</p>
                <el-input v-model="password" type="password" show-password placeholder="Senha" />
                <p>Confirmar Senha</p>
                <el-input v-model="confirm_password" type="password" show-password placeholder="Confirmar_senha" />
            </div>
            <div class="button-content">
            <el-button type="primary" @click="register">Enviar</el-button>
            <router-link to="/login">login</router-link>
            </div>
        </div>
        </div>
    </div>
</template>