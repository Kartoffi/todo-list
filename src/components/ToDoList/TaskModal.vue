<template>
  <Transition
    name="modal"
  >
    <div
      v-if="show"
      class="modal-mask"
    >
      <div class="modal-container">
        <button @click="$emit('close')"> X </button>
        <h2> {{ completed ? '✅' : '❌' }} {{ task.name }}</h2>
        <p> Kategorie: {{ task.tag }}</p>
      </div>
   </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: Boolean,
  task: Object,
  completed: Boolean,
});
</script>

<style scoped lang="scss">
button {
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  background-color: red;
  border: none;
  border-radius: 50%;
  color: white;
  font-weight: bold;
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.modal {
  &-mask {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.50);
    display: grid;
    place-items: center;
  }
  &-container {
    position: relative;
    background: white;
    padding: 1.5rem;
    width: 80vw;
    max-width: 500px;
    border-radius: 3px;
  }
}
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-to, .modal-leave-from {
  opacity: 1;
}
</style>

