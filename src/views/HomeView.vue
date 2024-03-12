<template>
<h1>Login</h1>
<h4>Seja bem-vindo!</h4>
<el-input
    v-model="user"
    style="width: 240px"
    placeholder="Username"
  />
  <el-input
    v-model="password"
    style="width: 240px"
    type="password"
    show-password
    placeholder="Password"
  />
  <el-button type="primary" @click="">Login</el-button>
  <router-link to="/register">register!</router-link>
  <a href="/register">another link</a>
  
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
const user = ref('')
const password = ref('')

function login(){

}

</script>
