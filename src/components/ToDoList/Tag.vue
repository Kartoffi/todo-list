<template>
  <button
    class="tag-button"
    v-if="!list.emptyTaskList(tag, completed)"
    :class="{ 'tag-highlight': selectedTag == tag }"
> {{ tag }} ({{ list.tasksLength(completed, tag) }})</button>
</template>

<script setup>
import { useListStore } from "../../store/ListStore.js";
let list = useListStore();

const { tag, completed, selectedTag } = defineProps(['tag', 'completed', 'selectedTag']);
</script>

<style scoped lang="scss">
.tag {
  &-button {
    background-color: #659235;
    color: white;
    font-size: 12px;
    font-weight: bold;
    border: none;
    padding: 10px;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background-color: #78a746;
    }
  }
  &-highlight {
    background-color: #88ba53;
  }
}
</style>
