<script setup>
  import { ref } from 'vue';
  import AddTask from '../components/AddTask.vue';
  import ToDoList from '../components/ToDoList.vue';
  const list = ref([]);
  const tags = ref([]);
  const completed = ref(true);
</script>

<template>
  <main>
    <AddTask
      :list="list"
      :tags="tags"/>
    <ToDoList
      :list="list"
      :tags="tags"
      title="ToDo"
      :completed="!completed"/>
    <ToDoList
      :list="list"
      :tags="tags"
      title="Completed"
      :completed="completed"/>
  </main>
</template>

<style scoped>
</style>
