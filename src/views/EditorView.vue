<script setup lang="ts">
import Quill from 'quill'
import Navbar from '@/components/Navbar.vue'
import { onMounted, ref } from 'vue'

let quill: any
const editorContent = ref<string>('')

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
    console.log(editorContent.value)
  })
})
</script>
<template>
  <div>
    <navbar />
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
</template>

<style scoped lang="less">
.editor-container {
  padding: 16px 40px;

  #editor {
    height: 80vh;
  }
}
</style>
