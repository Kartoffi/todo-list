<template>
  <button
    class="tag-button"
    :class="{ 'tag--highlight': selectedTag == tag }"
> {{ tag }} {{ tag != 'Alle' ? "(" + amountOfTasks + ")" : '' }}</button>
</template>

<script setup>
defineProps({
  tag: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: true,
  },
  selectedTag: {
    type: String,
  },
  amountOfTasks: {
    type: Number,
  },
});
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
