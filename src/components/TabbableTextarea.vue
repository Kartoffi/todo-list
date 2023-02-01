<script setup>
  defineProps({
    modelValue: String
  });

  let emit = defineEmits(['update:modelValue']);

  function onTabPress(e) {
    let textarea = e.target;
    let value = textarea.value;
    let start = textarea.selectionStart;
    let end = textarea.selectionEnd;
    textarea.value = value.substring(0, start) + "\t" + value.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + 1;
  }
</script>

<template>
  <textarea
    @keydown.tab.prevent="onTabPress"
    @keyup="emit('update:modelValue', e.target.value)"
    v-text="modelValue"/>
</template>

<style>
  textarea {
    width: 100%;
    height: 300px;
    padding: 10px;
    resize: none;
    border-radius: 6px;
  }
</style>
