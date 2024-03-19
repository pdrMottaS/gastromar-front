<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import api from '../service/api'
import router from '../router/index';

const user = ref('')
const password = ref('')

function login(){
  api.post('/auth/authentication',{
    name:user.value,
    password:password.value
  })
  .then(res=>{
    localStorage.setItem('token',res.data.token)
    localStorage.setItem('authorization',res.data.authorization)
    router.push('/')
  })
}

</script>
<template>
  <div class="strict">
    <div class="login-container">
      <div class="login-content">
        <div class="head-content">
          <h1>Login</h1>
          <h4>Seja bem-vindo!</h4>
        </div>
        <div class="form-content">
          <p>Usuário</p>
          <el-input v-model="user" placeholder="usuário" />
          <p>Senha</p>
          <el-input v-model="password" type="password" show-password placeholder="senha" />
        </div>
        <div class="button-content">
          <el-button type="primary" @click="login">Login</el-button>
          <router-link to="/register">cadastre-se</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>

<style>
.login-container {
  .login-content {
    .el-button {
      width: 100%;

      + .el-button {
        margin-left: 0;
      }
    }

    a {
      text-decoration: none;
    }
  }
}
</style>
