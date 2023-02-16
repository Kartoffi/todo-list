<template>
  <div
    v-if="show"
    class="modal-mask"
  >
    <div class="modal-container">
      <button @click="$emit('close')"> x </button>
      <h2> {{ task.name }} </h2>
      <p> Kategorie: {{ task.tag }}</p>
      <p> {{ task.completed ? 'Abgeschlossen' : 'Noch zu erledigen' }} </p>
    </div>
</div>
</template>

<script setup>
defineProps({
  show: Boolean,
  task: Object,
});
</script>

<style scoped lang="scss">
.modal {
  &-mask {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.50);
    display: grid;
    place-items: center;
  }
  &-container {
    background: white;
    padding: 1rem;
    width: 80vw;
    max-width: 500px;
  }
}
</style>

