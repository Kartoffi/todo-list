<template>
  <main>
    <TheWelcome />
    <AddTask />
    <ToDoList :completed="false" />
    <ToDoList completed />
</main>
</template>

<script setup>
import TheWelcome from '../components/ToDoList/WelcomeUser.vue';
import AddTask from '../components/ToDoList/AddTask.vue';
import ToDoList from '../components/ToDoList/ToDoList.vue';
</script>
