<script setup>
  import { ref } from 'vue';
  import { useFlash } from '../composables/useFlash';
  import { list } from "../store/taskStore.js";
  import { tags } from "../store/tagStore.js";
  let { flash } = useFlash();
  const assignment = ref('');
  const newAssignmentTag = ref('');
  let assignmentTag = ref('');
  let hidden = ref(false);

  function add() {
    if (newAssignmentTag.value !== '' && assignmentTag.value == '') {
      assignmentTag.value = newAssignmentTag.value;
    }
    for (let i = 0; i < list.length; i++) {
      if (list[i].name == assignment.value) {
        flash("Task nicht hinzugefügt", "Du hast bereits einen Task mit identischen Namen!", "warning");
        assignment.value = '';
        assignmentTag.value = '';
        newAssignmentTag.value = '';
        return;
      }
    }
    if (assignment.value != '') {
      list.push({
        name: assignment.value,
        completed: false,
        id: list.length+1,
        tag: assignmentTag.value,
      });
      localStorage.setItem('tasklist', JSON.stringify(list));
      for (let i = 0; i < tags.length; i++) {
        if (tags[i] == assignmentTag.value) {
          assignment.value = '';
          assignmentTag.value = '';
          newAssignmentTag.value = '';
          return;
        }
      }
      tags.push(assignmentTag.value);
      assignment.value = '';
      newAssignmentTag.value = '';
      assignmentTag.value = '';
    }
    localStorage.setItem('tasklist', JSON.stringify(list));
    localStorage.setItem('taglist', JSON.stringify(tags));
  }
</script>

<template>
  <main>
    <h3 :class="hidden ? 'reset-margin' : ''"> Neuen Task erstellen </h3>
    <form @submit.prevent="add" v-if="!hidden">
      <input type="text" v-model="assignment" placeholder="Task (bspw. putzen)" class="input-task input-categor">
      <div class="inline">
        <input type="text" v-model="newAssignmentTag" placeholder="Kategorie erstellen (bspw. Haushalt)" class="input-task">
        <p> oder </p>
        <select name="tags" id="tags" class="dropdown" v-model="assignmentTag">
          <option value="" disabled selected> Kategorie wählen </option>
            <option
              v-for="tag in tags"> {{ tag }} </option>
        </select>
      </div>
      <button class="add-task"> Task hinzufügen</button>
    </form>
    <div class="arrow-background" @click="hidden = !hidden" >
      <img class="arrow" src="../icons/arrow.png" alt="" :class="hidden ? 'rotate-arrow' : ''">
    </div>
  </main>
</template>

<style scoped>

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
  }

  .inline p {
    margin: 0 0.5rem;
  }

  .input-task {
    width: calc(100% - 20px);
    padding: 0 10px;
    height: 36px;
    border: none;
    border-radius: 3px;
    background-color: rgb(241, 241, 241);
  }

  .dropdown {
    width: calc(80% - 20px);
    padding: 0 10px;
    height: 36px;
    border: none;
    border-radius: 3px;
    background-color: rgb(241, 241, 241);
  }

  .add-task {
    padding: 0.75rem;
    width: fit-content;
    font-weight: bold;
    background-color: #509b00;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  .add-task:hover {
    background-color: #64c200;
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

 .arrow-background {
  display: flex;
  width: 100%;
  justify-content: center;
  cursor: pointer;
 }

 .arrow {
  width: 25px;
  height: auto;
  margin: 1rem 0 0 0;
  transition: all 0.2s ease;
 }

 .rotate-arrow {
  transform: rotate(180deg);
 }
</style>
