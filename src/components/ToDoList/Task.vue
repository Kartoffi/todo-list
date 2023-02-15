<script setup>
  import { ref } from "vue";
  import { useListStore } from "../../store/ListStore.js";
  import TaskModal from './TaskModal.vue';
  let list = useListStore();
  let showModal = ref(false);
  const { item, completed, selectedTag  } = defineProps(['item', 'completed', 'selectedTag']);
</script>
<template>
  <TaskModal
    :show="showModal"
    @close="showModal = false"
    :task="item.name"
    :tag="item.tag"
    :completed="item.completed"/>
  <div>
    <li v-if="item.completed == completed && (item.tag == selectedTag || selectedTag == 'Alle')">
      <div class="group">
        <input type="checkbox" class="check-box" @click="list.changeState(item)" v-if="!completed">
        <label :class="completed ? 'completed-task' : ''">
          {{ item.name }}
        </label>
      </div>
      <div class="group">
        <button @click="showModal = !showModal" class="task-options"> ... </button>
        <button @click="list.remove(item)" class="remove-task"> x </button>
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
  }

  .completed-task {
  text-decoration: line-through;
 }

 .task-options {
    border: none;
    width: 30px;
    font-size: 15px;
    font-weight: bold;
    color: black;
    background: none;
    opacity: 0;
    padding: 0;
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

  li:hover .remove-task, li:hover .task-options {
    opacity: 1;
  }
</style>
