<template>
  <main>
    <div
      class="inline-dropdown"
      :class="{ 'reset-margin' : hidden }"
      @click="hidden = !hidden"
    >
      <h3> Neuen Task erstellen
      </h3>
      <img
        class="arrow"
        src="../../icons/arrow.png"
        alt=""
        :class="{'arrow-rotate': hidden}"
      >
    </div>
    <!-- <h3 :class="{ 'reset-margin' : hidden }"> Neuen Task erstellen </h3> -->
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
      <div class="inline-default">
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
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  border: 1px solid #509b00;
  padding: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
  transition: all 0.2s ease;
}

h3 {
  margin: 0;
}

.inline {
  &-default {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    & p {
      margin: 0 0.5rem;
    }
  }

  &-dropdown {
    display: flex;
    justify-content: center;
    width: 100%;
    cursor: pointer;
    margin-bottom: 1rem;
  }
}

.reset-margin {
  margin-bottom: 0;
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
