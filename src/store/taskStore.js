import { defineStore } from "pinia";

export let useTaskStore = defineStore('addTask', {
  state() {
    return {
      tasklist: JSON.parse(localStorage.getItem('tasklist')) != null ? JSON.parse(localStorage.getItem('tasklist')) : [],
    };
  },
});
