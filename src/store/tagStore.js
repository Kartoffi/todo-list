import { reactive } from 'vue';
export let tags = reactive([]);
if (localStorage.getItem('taglist') != null) {
  tags = reactive(JSON.parse(localStorage.getItem('taglist')));
}
