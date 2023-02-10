<script setup>
  import { ref } from 'vue';
  import AddTask from '../components/AddTask.vue';
  import ToDoList from '../components/ToDoList.vue';
  let list = ref(JSON.parse(localStorage.getItem('tasklist')));
  list = list == null ? ref([]) : list;
  let tags = ref(JSON.parse(localStorage.getItem('taglist')));
  tags = tags == null ? ref([]) : tags;
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
      title="Noch erledigen"
      :completed="!completed"/>
    <ToDoList
      :list="list"
      :tags="tags"
      title="Abgeschlossen"
      :completed="completed"/>
  </main>
</template>

<style scoped>
</style>
