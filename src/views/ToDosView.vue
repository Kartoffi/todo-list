<script setup>
  import { ref } from 'vue';
  import TheWelcome from '../components/ToDoList/TheWelcome.vue';
  import AddTask from '../components/ToDoList/AddTask.vue';
  import ToDoList from '../components/ToDoList/ToDoList.vue';
  const completed = ref(true);
</script>

<template>
  <main>
    <TheWelcome/>
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
