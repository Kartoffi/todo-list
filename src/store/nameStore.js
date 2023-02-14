import { defineStore } from "pinia";

export let useNameStore = defineStore('saveUsername', {
  state() {
    return {
      name: localStorage.getItem('username') ? localStorage.getItem('username') : '',
    };
  },

  actions: {
    addName(newName) {
      this.name = newName;
      localStorage.setItem('username', this.name);
    }
  },
});
