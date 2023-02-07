<script setup>
  import { ref } from 'vue';
  import AddTask from '../components/AddTask.vue';
  import ToDoList from '../components/ToDoList.vue';
  const list = ref([]);
  const tags = ref([]);
</script>

<template>
  <main>
    <AddTask
        :list="list"
        :tags="tags"/>
    <ToDoList
      :list="list"
      :tags="tags"/>
  </main>
</template>

<style scoped>
</style>
