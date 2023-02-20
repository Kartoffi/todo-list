<template>
  <button
    class="tag-button"
    v-if="!taskList.emptyTaskList(tag, completed)"
    :class="{ 'tag--highlight': selectedTag == tag }"
> {{ tag }} ({{ taskList.tasksLength(completed, tag) }})</button>
</template>

<script setup>
import { useTaskStore } from "../../store/TaskStore.js";
let taskList = useTaskStore();

const { tag, completed, selectedTag } = defineProps(['tag', 'completed', 'selectedTag']);
</script>

<style scoped lang="scss">
$button-background-color: #659235;
$button-background-color-hover: #78a746;
$button-background-color-highlight: #88ba53;
.tag {
  &-button {
    background-color: $button-background-color;
    color: white;
    font-size: 12px;
    font-weight: bold;
    border: none;
    padding: 10px;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background-color: $button-background-color-hover;
    }
  }
  &--highlight {
    background-color: $button-background-color-highlight;
  }
}
</style>
