<script setup>
  import { username } from '../store/nameStore.js';
</script>

<template>
  <main>
    <h3> Willkommen, </h3>
    <form @submit.prevent="username.addName(username.name)">
      <input
        type="text"
        v-model="username.name"
        placeholder="User">
    </form>
  </main>
</template>

<style scoped>
  main {
    display: flex;
    align-items: center;
  }
  input {
    border: none;
    width: 100px;
  }
  input, h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: bold;
  }
</style>
