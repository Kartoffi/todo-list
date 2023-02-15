<script setup>
  import { useListStore } from "../../store/ListStore.js";
  let list = useListStore();

  const { item, completed, selectedTag  } = defineProps(['item', 'completed', 'selectedTag']);
</script>
<template>
  <div>
    <li v-if="item.completed == completed && (item.tag == selectedTag || selectedTag == 'Alle')">
      <div class="group">
        <input type="checkbox" class="check-box" @click="list.changeState(item)" v-if="!completed">
        <label :class="completed ? 'completed-task' : ''">
          {{ item.name }}
        </label>
      </div>
      <button @click="list.remove(item)" class="remove-task"> x </button>
    </li>
  </div>
</template>

<style scoped>
  .group {
    display: flex;
    width: unset;
  }

  .check-box {
    min-width: 18px;
    height: 18px;
  }

  .completed-task {
  text-decoration: line-through;
 }

  .remove-task {
    border: none;
    width: 30px;
    font-size: 15px;
    font-weight: bold;
    color: rgb(225, 58, 58);
    background: none;
    opacity: 0;
    padding: 0;
  }

  label {
    display: inline-block;
    word-break: break-word;
    margin-left: 0.5rem;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    padding: 1rem;
    border: 1px solid #509B00;
    margin: 0.5rem 0rem;
  }

  li:first-of-type{
    margin-top: 0;
  }

  li, li * {
    cursor: pointer;
  }

  li:hover {
    border-color: #88BA53;
  }

  li:hover .remove-task{
    opacity: 1;
  }
</style>
