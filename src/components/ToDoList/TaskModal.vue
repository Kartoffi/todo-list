<script setup>
  defineProps({
    show: Boolean,
    task: String,
    tag: String,
    completed: Boolean,
  });
</script>

<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-container">
      <button @click="$emit('close')"> x </button>
      <h2> {{ task }} </h2>
      <p> Kategorie: {{ tag }}</p>
      <p> {{ completed ? 'Abgeschlossen' : 'Noch zu erledigen'}} </p>
    </div>
  </div>
</template>

<style scoped>
  .modal-mask {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.50);
    display: grid;
    place-items: center;
  }
  .modal-container{
    background: white;
    padding: 1rem;
    width: 80vw;
    max-width: 500px;
  }
</style>
