<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
const user = ref('')
const password = ref('')
</script>
<template>
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
        <el-button type="primary">Login</el-button>
        <router-link to="/register">cadastre-se</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login-container {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;

  .login-content {
    display: flex;
    gap: 16px;
    flex-direction: column;

    .head-content {
      display: flex;
      gap: 8px;
      flex-direction: column;
    }

    .form-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .button-content {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
    }
  }
}
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
