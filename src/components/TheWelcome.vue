<script setup>
  import { RouterLink } from "vue-router";
  import { useFlash } from "../composables/useFlash.js";
  let { flash } = useFlash();
</script>

<template>
  <h1 class="green"> Nice to meet you! </h1>
  Welcome to ToDo-List, where you can keep track of all your to-dos and easily add and check off your tasks!
  <h1 class="green"> Functions</h1>
  Add tasks, remove tasks, give tasks categories and so much more!
  <h1 class="green"> Price </h1>
  ToDo-List is completely free!
  <h1 class="green"> Getting Started </h1>
  Click <RouterLink to="/todos"> here </RouterLink> to get started!
</template>
