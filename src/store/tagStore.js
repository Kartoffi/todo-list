import { defineStore } from "pinia";

export let useTagStore = defineStore('addTag', {
  state() {
    return {
      taglist: JSON.parse(localStorage.getItem('taglist')) != null ? JSON.parse(localStorage.getItem('taglist')) : [],
    };
  },
});
