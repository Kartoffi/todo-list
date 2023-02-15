<script setup>
  import { ref } from 'vue';
  import TheWelcome from '../components/ToDoList/WelcomeUser.vue';
  import AddTask from '../components/ToDoList/AddTask.vue';
  import ToDoList from '../components/ToDoList/ToDoList.vue';
  import { useListStore } from '../store/ListStore';
  let list = useListStore();
  const completed = ref(true);
</script>

<template>
  <main>
    <TheWelcome/>
    <AddTask/>
    <ToDoList
      :title="'Noch erledigen (' + list.tasksLength(false) + ')'"
      :completed="!completed"/>
    <ToDoList
      :title="'Abgeschlossen (' + list.tasksLength(true) + ')'"
      :completed="completed"/>
  </main>
</template>

<style scoped>
</style>
