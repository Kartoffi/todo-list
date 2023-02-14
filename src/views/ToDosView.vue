<script setup>
  import { ref } from 'vue';
  import AddTask from '../components/AddTask.vue';
  import ToDoList from '../components/ToDoList.vue';
  const completed = ref(true);
</script>

<template>
  <main>
    <AddTask/>
    <ToDoList
      title="Noch erledigen"
      :completed="!completed"/>
    <ToDoList
      title="Abgeschlossen"
      :completed="completed"/>
  </main>
</template>

<style scoped>
</style>
