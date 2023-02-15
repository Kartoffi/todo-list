import { defineStore } from "pinia";
import { useFlash } from '../composables/useFlash';

let { flash } = useFlash();

export let useListStore = defineStore('list', {
  state() {
    return {
      tasks: JSON.parse(localStorage.getItem('tasks')) != null ? JSON.parse(localStorage.getItem('tasks')) : [],
      tags: JSON.parse(localStorage.getItem('tags')) != null ? JSON.parse(localStorage.getItem('tags')) : ["Alle"],
      task: '',
      tag: '',
      newTag: ''
    };
  },

  actions: {
    add() {
      if (this.newTag !== '' && this.tag == '') {
        this.tag = this.newTag;
      }
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].name == this.task) {
          flash("Task nicht hinzugefügt", "Du hast bereits einen Task mit identischen Namen!", "warning");
          this.task = '';
          this.tag = '';
          this.newTag = '';
          return;
        }
      }
      if (this.task != '') {
        this.tasks.push({
          name: this.task,
          completed: false,
          id: this.tasks.length+1,
          tag: this.tag,
        });
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        for (let i = 0; i < this.tags.length; i++) {
          if (this.tags[i] == this.tag) {
            this.task = '';
            this.tag = '';
            this.newTag = '';
            return;
          }
        }
        this.tags.push(this.tag);
        this.task = '';
        this.newTag = '';
        this.tag = '';
      }
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      localStorage.setItem('tags', JSON.stringify(this.tags));
    },

    changeState(task) {
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].name == task.name) {
          this.tasks[i].completed = true;
        }
      }
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

    remove(task) {
      let currentTag = "";
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].name == task.name) {
          currentTag = this.tasks[i].tag;
          this.tasks.splice(i, 1);
        }
      }
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].tag == currentTag) {
          return;
        }
      }
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i] == currentTag) {
          this.tags.splice(i, 1);
        }
      }
      localStorage.setItem('tags', JSON.stringify(this.tags));
    },

    tasksLength(tag) {
      let taskCounter = 0;
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].tag === tag || tag === 'Alle') {
          taskCounter++;
        }
      }
      return taskCounter;
    },

    emptyTaskList(tag, empty) {
      let listNotEmpty = true;
      for (let i = 0; i < this.tasks.length; i++) {
        if ((this.tasks[i].tag === tag || tag === 'Alle') && this.tasks[i].completed === empty) {
          listNotEmpty = false;
        }
      }
      return listNotEmpty;
    },
  },

  getters: {

  }
});
