<script setup>
  import { ref } from "vue";
  import Task from "./Task.vue";
  const { list, tags } = defineProps(['list', 'tags']);
  const completed = ref(false);
  let selectedTag = ref("Alle");
</script>

<template>
  <div class="buttons-tab" v-if="list.length">
    <button @click="completed = !completed" v-if="completed == false" class="standard-button">ToDo</button>
    <button @click="completed = !completed" v-else class="standard-button">Completed</button>
    <button class="tag-button"
        @click="selectedTag = 'Alle'"
        :class="selectedTag === 'Alle' ? 'tag-highlight' : ''"> Alle </button>
    <div v-for="tag of tags">
      <button class="tag-button"
        @click="selectedTag = tag"
        :class="selectedTag === tag ? 'tag-highlight' : ''"> {{ tag }}</button>
    </div>
  </div>
  <ul v-if="list.length">
    <Task
      v-for="item of list"
      :item="item"
      :selected-tag="selectedTag"
      :completed="completed"
      :list="list"
      :tags="tags"/>
  </ul>
</template>

<style scoped>
  .buttons-tab {
  margin: 1rem 0rem;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
 }

 .standard-button {
    background-color: #509b00;
    color: white;
    font-weight: bold;
    border:none;
    padding: 10px;
    border-radius: 3px;
    cursor: pointer;
 }

 .tag-button {
    background-color: #659235;
    color: white;
    font-size: 12px;
    font-weight: bold;
    border:none;
    padding: 10px;
    border-radius: 3px;
    cursor: pointer;
 }

 .tag-highlight {
  background-color: #88ba53;
 }

 .tag-button:hover {
  background-color: #78a746;
 }

 .standard-button:hover {
    background-color: #64c200;
 }

  ul {
    padding-left: 0;
    margin: 0;
  }
</style>
