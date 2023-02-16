<script setup>
import { ref, computed } from "vue";
import Task from "./Task.vue";
import Tag from "./Tag.vue";
import { useListStore } from "../../store/ListStore.js";

let list = useListStore();
let tags = list.tags;
let tasks = list.tasks;

const { completed } = defineProps({
  completed: {
    type: Boolean,
    default: true,
  },
});
let selectedTag = ref("Alle");
let hidden = ref(false);

const filteredTasks = computed(() => {
  return tasks.filter((task) => task.completed == completed && (task.tag === selectedTag.value || selectedTag.value === 'Alle'));
});
</script>

<template>
  <main>
    <div
      class="inline"
      @click="hidden = !hidden"
    >
      <h3 :class="hidden ? 'reset-margin' : ''"> {{ completed ? 'Abgeschlossen' : 'Offen' }} ({{ filteredTasks.length }})
      </h3>
      <img
        class="arrow"
        src="../../icons/arrow.png"
        alt=""
        :class="hidden ? 'rotate-arrow' : ''"
      >
    </div>
    <div
      class="buttons-tab"
      v-if="!hidden"
    >
      <Tag
        v-for="tag of tags"
        @click="selectedTag = tag"
        :tag="tag"
        :selected-tag="selectedTag"
        :completed="completed"
      />
    </div>
    <ul v-if="filteredTasks.length && !hidden">
      <Task
        v-for="task of filteredTasks"
        :task="task"
        :completed="completed"
      />
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
  border: none;
  padding: 10px;
  border-radius: 3px;
  cursor: pointer;
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
