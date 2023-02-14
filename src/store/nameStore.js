import { ref } from 'vue';
export let username = ref({
  name:  localStorage.getItem('username') ? localStorage.getItem('username') : '',

  addName(newName) {
    this.name = newName;
    localStorage.setItem('username', this.name);
  }
});
