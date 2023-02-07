<script setup>
  import { ref } from 'vue';
  import { useFlash } from '../composables/useFlash';
  import Task from '../components/Task.vue';
  let { flash } = useFlash();
  const assignment = ref('');
  const newAssignmentTag = ref('');
  let assignmentTag = ref('');
  const list = ref([]);
  const tags = ref([]);
  const completed = ref(false);
  let selectedTag = ref("Alle");
  function add() {
    if (newAssignmentTag.value !== '' && assignmentTag.value == '') {
      assignmentTag.value = newAssignmentTag.value;
    }
    for (let i = 0; i < list.value.length; i++) {
      if (list.value[i].name == assignment.value) {
        flash("Task nicht hinzugefügt", "Du hast bereits einen Task mit identischen Namen!", "warning");
        return;
      }
    }
    if (assignment.value != '') {
      list.value.push({
        name: assignment.value,
        completed: false,
        id: list.value.length+1,
        tag: assignmentTag.value,
      });
      for (let i = 0; i < tags.value.length; i++) {
        if (tags.value[i] == assignmentTag.value) {
          assignment.value = '';
          assignmentTag.value = '';
          newAssignmentTag.value = '';
          return;
        }
      }
      tags.value.push(assignmentTag.value);
      assignment.value = '';
      newAssignmentTag.value = '';
      assignmentTag.value = '';
    }
  }
</script>

<template>
  <main>
    <form @submit.prevent="add">
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
    <div class="buttons-tab">
      <button @click="completed = !completed" v-if="completed == false" class="standard-button">ToDo</button>
      <button @click="completed = !completed" v-else class="standard-button">Completed</button>
      <button class="tag-button"
          @click="selectedTag = 'Alle'"
          :class="selectedTag === 'Alle' ? 'tag-highlight' : ''"> Alle </button>
      <div v-for="tag of tags">
        <button class="tag-button"
          @click="selectedTag = tag"
          :class="selectedTag === tag ? 'tag-highlight' : ''"> {{ tag }}</button>
      </div>
    </div>
    <ul v-if="list.length">
      <Task
        v-for="item of list"
        :item="item"
        :selected-tag="selectedTag"
        :completed="completed"
        :list="list"
        :tags="tags"/>
    </ul>
    <p v-else-if="list.length"></p>
    <p v-else></p>
  </main>
</template>

<style scoped>

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
</style>
