<template>
  <Teleport to="body">
    <TaskModal
      :show="showModal"
      @close="showModal = false"
      :task="task"
      :completed="completed"
    />
  </Teleport>
  <div>
    <li>
      <div class="task-group">
        <form
          @click="taskList.changeState(task)"
        >
          <input
            type="checkbox"
            class="check-box"
            v-if="!completed"
          >
        </form>
        <label :class="{ 'task--completed': completed }">
          {{ task.name }}
        </label>
      </div>
      <div class="task-group">
        <button
          @click="showModal = !showModal"
          class="task-options"
        > ... </button>
        <button
          @click="taskList.remove(task, completed)"
          class="task-remove-button"
        > x </button>
      </div>
    </li>
</div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../../store/TaskStore.js";
import TaskModal from './TaskModal.vue';
let taskList = useTaskStore();
let showModal = ref(false);
defineProps({
  task: Object,
  completed: Boolean,
});
</script>

<style scoped lang="scss">
$list-item-color: #509B00;

.task {
  &-options {
    border: none;
    width: 30px;
    font-size: 15px;
    font-weight: bold;
    color: black;
    background: none;
    opacity: 0;
    padding: 0;
  }

  &-group {
    display: flex;
    width: unset;
  }

  &-remove-button {
    border: none;
    width: 30px;
    font-size: 15px;
    font-weight: bold;
    color: rgb(225, 58, 58);
    background: none;
    opacity: 0;
    padding: 0;
  }

  &--completed {
    text-decoration: line-through;
  }
}

.check-box {
  min-width: 18px;
  height: 18px;
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
  border: 1px solid $list-item-color;
  margin: 0.5rem 0rem;

  &:first-of-type {
    margin-top: 0;
  }

  & * {
    cursor: pointer;
  }

  &:hover {
    border-color: #88BA53;

    .task-remove-button,
    .task-options {
      opacity: 1;
    }
  }
}
</style>
