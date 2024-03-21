<script setup lang="ts">
import Quill from 'quill'
import Navbar from '@/components/Navbar.vue'
import { ElNotification } from 'element-plus'
import { onMounted, ref, reactive, h } from 'vue'
import api from '../service/api'
import { useRouter } from 'vue-router'

let quill: any
const editorContent = ref<string>('')
const router = useRouter()
const token = ref(localStorage.getItem('token'))
const form = reactive({
  name: '',
  dateInit: '',
  timeInit: '',
  dateFinish: '',
  timeFinish: '',
  content: editorContent.value,
  value: null,
  max_person: null
})

onMounted(() => {
  quill = new Quill('#editor', {
    modules: {
      syntax: true,
      toolbar: '#toolbar-container'
    },
    placeholder: 'Digite aqui :)',
    theme: 'snow'
  })

  quill.on('text-change', () => {
    editorContent.value = quill.root.innerHTML
  })
})

const success = () => {
  ElNotification({
    title: 'Sucesso',
    message: 'Evento cadastrado com sucesso!',
    type: 'success',
    duration: 2500
  })
}

const fail = () => {
  ElNotification({
    title: 'Erro',
    message: 'Erro ao cadastrar evento!',
    type: 'error'
  })
}

function onSubmit() {
  api
    .post(
      '/event',
      {
        name: form.name,
        init: `${form.dateInit}T${form.timeInit}:00`,
        finish: `${form.dateFinish}T${form.timeFinish}:00`,
        content: editorContent.value,
        value: Number(`${form.value}.00`),
        max_person: form.max_person
      },
      {
        headers: { Authorization: `Bearer ${token.value}` }
      }
    )
    .then((res) => {
      success()
      console.log(res)
      router.push('/events')
    })
    .catch((err) => {
      fail()
      console.log(err)
    })
}
</script>
<template>
  <div>
    <navbar />
  </div>
  <div class="details-container">
    <h1>Detalhes do evento</h1>
    <div class="form-container">
      <el-form :model="form" label-width="auto" :label-position="'left'">
        <el-form-item label="Nome do evento">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Data Início">
          <el-col :span="11">
            <el-date-picker
              v-model="form.dateInit"
              format="DD/MM/YYYY"
              value-format="YYYY-MM-DD"
              type="date"
            />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-time-select
              v-model="form.timeInit"
              style="width: 240px"
              start="01:00"
              step="00:05"
              end="24:00"
              placeholder=""
            />
          </el-col>
        </el-form-item>
        <el-form-item label="Data Fim">
          <el-col :span="11">
            <el-date-picker
              v-model="form.dateFinish"
              format="DD/MM/YYYY"
              value-format="YYYY-MM-DD"
              type="date"
            />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-time-select
              v-model="form.timeFinish"
              style="width: 240px"
              start="01:00"
              step="00:05"
              end="24:00"
              placeholder=""
            />
          </el-col>
        </el-form-item>
        <el-form-item label="Valor">
          <el-input v-model="form.value" style="width: 222px">
            <template #prepend>R$</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Valor máximo de pessoas">
          <el-input-number v-model="form.max_person" style="width: 222px" />
        </el-form-item>
      </el-form>
    </div>
    <div class="editor-container">
      <div id="toolbar-container">
        <span class="ql-formats">
          <select class="ql-font"></select>
          <select class="ql-size"></select>
        </span>
        <span class="ql-formats">
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-underline"></button>
          <button class="ql-strike"></button>
        </span>
        <span class="ql-formats">
          <select class="ql-color"></select>
          <select class="ql-background"></select>
        </span>
        <span class="ql-formats">
          <button class="ql-script" value="sub"></button>
          <button class="ql-script" value="super"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-header" value="1"></button>
          <button class="ql-header" value="2"></button>
          <button class="ql-blockquote"></button>
          <button class="ql-code-block"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-list" value="ordered"></button>
          <button class="ql-list" value="bullet"></button>
          <button class="ql-indent" value="-1"></button>
          <button class="ql-indent" value="+1"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-direction" value="rtl"></button>
          <select class="ql-align"></select>
        </span>
        <span class="ql-formats">
          <button class="ql-link"></button>
          <button class="ql-image"></button>
          <button class="ql-video"></button>
          <button class="ql-formula"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-clean"></button>
        </span>
      </div>
      <div id="editor"></div>
    </div>
    <el-button type="primary" @click="onSubmit()">Cadastrar</el-button>
  </div>
</template>

<style scoped lang="less">
.details-container {
  padding: 2rem;
  display: flex;
  flex-direction: column;

  .form-container {
    .el-form {
      padding: 8px 42px;
    }
  }
  .editor-container {
    padding: 16px 40px;

    #editor {
      height: 80vh;
    }
  }
}
</style>
