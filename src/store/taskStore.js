import { reactive } from 'vue';
export let list = reactive([]);
if (localStorage.getItem('tasklist') != null) {
  list = reactive(JSON.parse(localStorage.getItem('tasklist')));
}
