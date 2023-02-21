<template>
  <main>
    <h3 :class="{ 'reset-margin' : hidden }"> Neuen Task erstellen </h3>
    <form
      @submit.prevent="createTask"
      v-if="!hidden"
    >
      <input
        type="text"
        v-model="taskList.task"
        placeholder="Task (bspw. putzen)"
        class="task-input"
      >
      <div class="inline">
        <input
          type="text"
          v-model="taskList.newTag"
          placeholder="Kategorie erstellen (bspw. Haushalt)"
          class="task-input"
        >
        <p> oder </p>
        <select
          name="tags"
          id="tags"
          class="dropdown"
          v-model="taskList.tag"
        >
          <option
            value=""
            disabled
            selected
          > Kategorie wählen </option>
          <option v-for="tag in taskList.tags.slice(1)"> {{ tag }} </option>
        </select>
      </div>
      <button class="task-add"> Task hinzufügen</button>
    </form>
    <div
      class="arrow-background"
      @click="hidden = !hidden"
    >
      <img
        class="arrow"
        src="../../icons/arrow.png"
        alt=""
        :class="{'arrow-rotate' : hidden}"
      >
    </div>
</main>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../../store/TaskStore.js';
import { useFlash } from '../../composables/useFlash';
let { flash } = useFlash();

let taskList = useTaskStore();
let hidden = ref(false);

function createTask() {
  let taskNameAlreadyExists = taskList.incompletedTasks.find((task) => task.name == taskList.task);
  taskNameAlreadyExists = taskNameAlreadyExists ? taskNameAlreadyExists : taskList.completedTasks.find((task) => task.name == taskList.task);
  if (taskNameAlreadyExists) {
    flash("Task nicht hinzugefügt", "Du hast bereits einen Task mit identischen Namen!", "warning");
    return;
  }
  taskList.add();
}
</script>

<style scoped lang="scss">
h3 {
  margin: 0 0 1rem 0;
}

.reset-margin {
  margin: 0;
}

.inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  & p {
    margin: 0 0.5rem;
  }
}

.task {
  &-input {
    width: calc(100% - 20px);
    padding: 0 10px;
    height: 36px;
    border: none;
    border-radius: 3px;
    background-color: rgb(241, 241, 241);
  }
  &-add {
    padding: 0.75rem;
    width: fit-content;
    font-weight: bold;
    background-color: #509b00;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background-color: #64c200;
    }
  }
}

.dropdown {
  width: calc(80% - 20px);
  padding: 0 10px;
  height: 36px;
  border: none;
  border-radius: 3px;
  background-color: rgb(241, 241, 241);
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
  transition: all 0.2s ease;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  border: 1px solid #509b00;
  padding: 1rem;
}

.arrow {
  width: 25px;
  height: auto;
  margin: 1rem 0 0 0;
  transition: all 0.2s ease;
  &-rotate {
    transform: rotate(180deg);
  }
  &-background {
    display: flex;
    width: 100%;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
