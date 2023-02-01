import { ref, watch } from 'vue';

export function useStorage(key) {
  let storedValue = read();
  let value = ref(storedValue);

  watch(value, write);

  function read() {
    return localStorage.getItem(key);
  }

  function write() {
    if (value.value === '') {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value.value);
    }
  }
  return value;
}
