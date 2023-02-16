<template>
  <header>
    <div class="wrapper">
      <div class="greetings">
        <h1 class="green"> ToDo-List </h1>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style scoped>
  main {
    margin-top: 1.5rem;
  }

  .greetings h1 {
    text-align: center;
    font-family: Marker Felt;
    font-size: 60px;
    margin: 0;
    font-weight: 500;
  }
</style>
