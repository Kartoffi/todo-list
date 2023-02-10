<script setup>
  import { ref } from 'vue';
  import AddTask from '../components/AddTask.vue';
  import ToDoList from '../components/ToDoList.vue';
  let list = ref([]);
  if (localStorage.getItem('tasklist') != null) {
    list = ref(JSON.parse(localStorage.getItem('tasklist')));
  }
  let tags = ref([]);
  if (localStorage.getItem('taglist') != null) {
    tags = ref(JSON.parse(localStorage.getItem('taglist')));
  }
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
