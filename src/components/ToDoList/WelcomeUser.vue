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

<script setup>
  import { useNameStore } from '../../store/NameStore.js';

  let username = useNameStore();
</script>

<style scoped lang="scss">
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
