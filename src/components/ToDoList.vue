<script setup>
  import { ref } from "vue";
  import Task from "./Task.vue";
  import { list } from "../store/taskStore.js";
  import { tags } from "../store/tagStore.js";
  const { title, completed } = defineProps(['title', 'completed']);
  let selectedTag = ref("Alle");
  let hidden = ref(false);
</script>

<template>
  <main>
    <div class="inline" @click="hidden = !hidden">
      <h3 :class="hidden ? 'reset-margin' : ''"> {{ title }} </h3>
      <img class="arrow" src="../icons/arrow.png" alt="" :class="hidden ? 'rotate-arrow' : ''">
    </div>
    <div class="buttons-tab" v-if="!hidden">
      <button class="tag-button"
          @click="selectedTag = 'Alle'"
          :class="selectedTag === 'Alle' ? 'tag-highlight' : ''"> Alle </button>
      <div v-for="tag of tags">
        <button class="tag-button"
          @click="selectedTag = tag"
          :class="selectedTag === tag ? 'tag-highlight' : ''"> {{ tag }}</button>
      </div>
    </div>
    <ul v-if="list.length && !hidden">
      <Task
        v-for="item of list"
        :item="item"
        :selected-tag="selectedTag"
        :completed="completed"/>
    </ul>
  </main>
</template>

<style scoped>

  main {
    margin: 1rem 0;
  }

  .inline {
    display: flex;
    cursor: pointer;
    width: fit-content;
  }

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
  .arrow {
  width: 14px;
  height: auto;
  margin: 0 0 0 0.5rem;
  transition: all 0.2s ease;
  align-self: center;
 }

 .rotate-arrow {
  transform: rotate(180deg);
 }
</style>
