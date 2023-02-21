import { defineStore } from "pinia";

export let useTaskStore = defineStore('taskList', {
  state() {
    return {
      incompletedTasks: JSON.parse(localStorage.getItem('incompletedTasks')) != null ? JSON.parse(localStorage.getItem('incompletedTasks')) : [],
      completedTasks: JSON.parse(localStorage.getItem('completedTasks')) != null ? JSON.parse(localStorage.getItem('completedTasks')) : [],
      tags: JSON.parse(localStorage.getItem('tags')) == null ? ["Alle"] : JSON.parse(localStorage.getItem('tags')),
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

      if (this.task == '') {
        return;
      }

      this.incompletedTasks.push({
        name: this.task,
        id: this.incompletedTasks.length+1,
        tag: this.tag,
      });
      localStorage.setItem('incompletedTasks', JSON.stringify(this.incompletedTasks));
      for (let tag in this.tags) {
        if (this.tags[tag] == this.tag) {
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
      localStorage.setItem('incompletedTasks', JSON.stringify(this.incompletedTasks));
      localStorage.setItem('tags', JSON.stringify(this.tags));
    },

    changeState(task) {
      for (let i = 0; i < this.incompletedTasks.length; i++) {
        if (this.incompletedTasks[i].name == task.name) {
          this.incompletedTasks.splice(i, 1);
        }
      }
      this.completedTasks.push({
        name: task.name,
        id: this.completedTasks.length+1,
        tag: task.tag,
      });
      localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks));
      localStorage.setItem('incompletedTasks', JSON.stringify(this.incompletedTasks));
    },

    remove(task, completed) {
      let currentList = completed ? this.completedTasks : this.incompletedTasks;
      let currentTag = "";
      for (let i = 0; i < currentList.length; i++) {
        if (currentList[i].name == task.name) {
          currentTag = currentList[i].tag;
          currentList.splice(i, 1);
          break;
        }
      }
      completed ? this.completedTasks = currentList : this.incompletedTasks = currentList;
      localStorage.setItem(completed ? 'completedTasks' : 'incompletedTasks', JSON.stringify(currentList));
      for (let i = 0; i < currentList.length; i++) {
        if (currentList[i].tag == currentTag) {
          return;
        }
      }
      let otherList = completed ? this.incompletedTasks : this.completedTasks;
      for (let i = 0; i < otherList.length; i++) {
        if (otherList[i].tag == currentTag) {
          return;
        }
      }
      for (let tag in this.tags) {
        if (this.tags[tag] == currentTag) {
          this.tags.splice(tag, 1);
        }
      }
      localStorage.setItem('tags', JSON.stringify(this.tags));
    },

    // tasksLength(completed, tag) {
    //   tag = tag == 'Alle' ? null : tag;
    //   let counter = 0;
    //   let taskCounter = {
    //     all: 0,
    //     completed: 0,
    //     incompleted: 0,
    //   };
    //   for (let i = 0; i < this.tasks.length; i++) {
    //     if (this.tasks[i].tag == tag || tag == null) {
    //       taskCounter.all = taskCounter.all+1;
    //     }
    //     if ((this.tasks[i].tag == tag || tag == null) && !this.tasks[i].completed) {
    //       taskCounter.incompleted++;
    //     }
    //     if ((this.tasks[i].tag == tag || tag == null) && this.tasks[i].completed) {
    //       taskCounter.completed++;
    //     }
    //   }
    //   counter = completed == null ? taskCounter.all : (completed ? taskCounter.completed : taskCounter.incompleted);
    //   return counter;
    // },

    // empty(tag, empty) {
    //   let listNotEmpty = true;
    //   for (let i = 0; i < this.tasks.length; i++) {
    //     if ((this.tasks[i].tag == tag || tag == 'Alle') && this.tasks[i].completed == empty) {
    //       listNotEmpty = false;
    //     }
    //   }
    //   return listNotEmpty;
    // },
  },

  getters: {
  }
});
