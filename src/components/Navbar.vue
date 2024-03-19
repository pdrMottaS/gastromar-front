<script setup lang="ts">
import router from '../router/index'
import auth from '../util/isauth';
import {ref} from 'vue'

const activeIndex = ref()
const authDict = auth()

function handleSelect(index:string){
    router.push(index)
}

</script>
<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <el-menu-item index="/">
            <h1>Home</h1>
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="/events">Eventos</el-menu-item>
        <el-menu-item v-if="authDict != null" index="/profile">Profile</el-menu-item>
        <el-sub-menu v-else index="">
            <template #title>Auth</template>
            <el-menu-item index="/login">Login</el-menu-item>
            <el-menu-item index="/register">Cadastro</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>