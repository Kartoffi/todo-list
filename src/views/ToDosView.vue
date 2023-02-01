<script setup>
  import { ref } from 'vue';
  import { useFlash } from '../composables/useFlash';
  // import { useStorage } from '../composables/useStorage.js';

  // let food = useStorage('food');
  // let age = useStorage('age');
  // let comment = ref('test value');
  const assignment = ref('');
  const show = ref(true);
  const list = ref([]);
  function add() {
    if (assignment.value != '') {
      list.value.push(assignment.value);
    }
  }
</script>

<template>
  <main>
    <!-- <h1 class="green"> Your ToDos for today</h1> -->
    <!-- <p>What is your favorite food? <input type="text" v-model="food"></p>
    <p>How old are you? <input type="text" v-model="age"></p> -->
    <!-- <form @submit.prevent="add"> -->
    <div>
      <input type="text" v-model="assignment" placeholder="New Assignment..." class="input-task">
      <button @click="add" class="add-task"> +</button>
    </div>
    <button @click="show = !show" v-if="show" class="show-list">Hide List</button>
    <button @click="show = !show" v-else class="show-list">Show List</button>
    <!-- </form> -->

    <ul v-if="show && list.length">
      <li v-for="item of list">
        <label>
          {{ item }}
        </label>
        <input type="checkbox" class="check-box">
      </li>
    </ul>
    <p v-else-if="list.length"></p>
    <p v-else></p>
  </main>
</template>

<style scoped>
  .input-task {
    width: 100%;
    padding: 0 10px;
    height: 36px;
    border: none;
    border-radius: 3px 0px 0px 3px;
    background-color: rgb(241, 241, 241);
  }

  .add-task {
    height: 36px;
    width: 36px;
    font-size: 24px;
    font-weight: bold;
    background-color: #509b00;
    color: white;
    border: none;
    border-radius: 0px 3px 3px 0px;
    cursor: pointer;
  }

  .add-task:hover {
    background-color: #64c200;
  }

 div {
    display: flex;
    width: 100%;
 }

 .show-list {
    background-color: #509b00;
    color: white;
    font-weight: bold;
    border:none;
    padding: 10px;
    border-radius: 3px;
    margin: 1rem 0;
    cursor: pointer;
    width: 90px;
 }

 .show-list:hover {
    background-color: #64c200;
 }

  ul {
    padding-left: 0;
    margin: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    padding: 1rem;
    border: 1px solid #75E200;
    margin: 0.5rem 0rem;
  }

  li:first-of-type{
    margin-top: 0;
  }

  li, li * {
    cursor: pointer;
  }

  label {
    max-width: fit-content;
  }

  .check-box {
    min-width: 18px;
    height: 18px;
    margin-left: 1rem;
  }
</style>
