<script setup>
  const { item, completed, list, tags, selectedTag  } = defineProps(['item', 'completed', 'list', 'tags', 'selectedTag']);

  function remove(task) {
    let currentTag = "";
    for (let i = 0; i < list.length; i++) {
      if (list[i].name == task.name) {
        currentTag = list[i].tag;
        list.splice(i, 1);
      }
    }
    for (let i = 0; i < list.length; i++) {
      if (list[i].tag == currentTag) {
        return;
      }
    }
    for (let i = 0; i < tags.length; i++) {
      if (tags[i] == currentTag) {
        tags.splice(i, 1);
      }
    }
  }

  function changeState(task) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].name == task.name) {
        list[i].completed = true;
      }
    }
  }
</script>
<template>
  <div>
    <li v-if="item.completed == completed && (item.tag == selectedTag || selectedTag == 'Alle')">
      <label :class="completed ? 'completed-task' : ''">
        {{ item.name }}
      </label>
      <div class="group">
        <input type="checkbox" class="check-box" @click="changeState(item)" v-if="!completed">
        <button @click="remove(item)" class="remove-task"> x </button>
      </div>
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
    margin-left: 1rem;
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
