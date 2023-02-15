<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="greetings">
        <h1 class="green"> ToDo-List </h1>
      </div>
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/todos">ToDos</RouterLink>
      </nav> -->
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
  nav {
    width: 100%;
    font-size: 16px;
    text-align: center;
    margin-top: 2rem;
  }

  nav a.router-link-exact-active {
    color: var(--color-text);
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }

  nav a:first-of-type {
    border: 0;
  }

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
