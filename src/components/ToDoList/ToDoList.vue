<template>
  <main>
    <div
      class="inline"
      @click="hidden = !hidden"
    >
      <h3 :class="{'reset-margin': hidden}"> {{ completed ? 'Abgeschlossen' : 'Offen' }} ({{ tasks.length }})
      </h3>
      <img
        class="arrow"
        src="../../icons/arrow.png"
        alt=""
        :class="{'arrow-rotate': hidden}"
      >
    </div>
    <div
      class="button-tab"
      v-if="!hidden"
    >
      <Tag
        v-for="tag of filteredTags"
        @click="selectedTag = tag"
        :tag="tag"
        :selected-tag="selectedTag"
        :completed="completed"
        :amount-of-tasks="tasks.filter((task) => (task.tag === tag || tag === 'Alle')).length"
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

<script setup>
import { ref, computed } from "vue";
import Task from "./Task.vue";
import Tag from "./Tag.vue";
import { useTaskStore } from "../../store/TaskStore.js";

const { completed } = defineProps({
  completed: {
    type: Boolean,
    default: true,
  },
});
let taskList = useTaskStore();
let tags = taskList.tags;
let selectedTag = ref("Alle");
let hidden = ref(false);

let tasks = completed ? taskList.completedTasks : taskList.incompletedTasks;
const filteredTasks = computed(() => {
  return tasks.filter((task) => (task.tag === selectedTag.value || selectedTag.value === 'Alle'));
});

const filteredTags = computed(() => {
  return tags.filter((tag) => (tasks.filter((task) => (task.tag === tag || tag == 'Alle')).length > 0));
});
</script>

<style scoped lang="scss">
main {
  margin: 1rem 0;
}

.inline {
  display: flex;
  cursor: pointer;
  width: fit-content;
}

.button-tab {
  margin: 1rem 0rem;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
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
  &-rotate {
    transform: rotate(180deg);
  }
}
</style>
