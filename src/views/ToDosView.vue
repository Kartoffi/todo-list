<script setup>
  import { ref } from 'vue';
  import { useFlash } from '../composables/useFlash';
  let { flash } = useFlash();
  // import { useStorage } from '../composables/useStorage.js';

  // let food = useStorage('food');
  // let age = useStorage('age');
  // let comment = ref('test value');
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
  function remove(task) {
    let currentTag = "";
    for (let i = 0; i < list.value.length; i++) {
      if (list.value[i].name == task.name) {
        currentTag = list.value[i].tag;
        list.value.splice(i, 1);
      }
    }
    for (let i = 0; i < list.value.length; i++) {
      if (list.value[i].tag == currentTag) {
        return;
      }
    }
    for (let i = 0; i < tags.value.length; i++) {
      if (tags.value[i] == currentTag) {
        tags.value.splice(i, 1);
      }
    }
    selectedTag = ref("Alle");
  }
  function changeState(task) {
    for (let i = 0; i < list.value.length; i++) {
      if (list.value[i].name == task.name) {
        list.value[i].completed = true;
      }
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
      <div v-for="item of list">
        <li v-if="item.completed == completed && (item.tag == selectedTag || selectedTag == 'Alle')">
          <label :class="completed ? 'completed-task' : ''">
            {{ item.name }}
          </label>
          <div class="group">
            <input type="checkbox" class="check-box" @click="changeState(item)" v-if="!completed">
            <button @click="remove(item)" class="remove-task"> x </button>
          </div>
        </li>
      </div>
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

  .remove-task {
    border: none;
    width: 30px;
    font-size: 15px;
    font-weight: bold;
    color: rgb(225, 58, 58);
    background: none;
    opacity: 0;
    padding: 0;
  }

  li:hover {
    border-color: aliceblue;
  }

  li:hover .remove-task{
    opacity: 1;
  }

 form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1rem;
 }

 .group {
  display: flex;
  width: unset;
 }

 .completed-task {
  text-decoration: line-through;
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
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between; */
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    padding: 1rem;
    border: 1px solid #75E200;
    margin: 0.5rem 0rem;
  }

  li:first-of-type{
    margin-top: 0;
  }

  li, li * {
    cursor: pointer;
  }

  label {
    /* width: 100%; */
    /* word-break:normal; */
    display: inline-block;
    word-break: break-word;
  }

  .check-box {
    min-width: 18px;
    height: 18px;
    margin-left: 1rem;
  }
</style>
