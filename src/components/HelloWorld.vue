<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
  </div>
</template>

<style scoped>
.greetings h1 {
  text-align: center;
  font-family: Marker Felt;
  font-size: 60px;
  margin: 0;
  font-weight: 500;
}
</style>
