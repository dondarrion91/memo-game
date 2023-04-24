<script setup>
defineProps({
  points: {
    type: Number,
    default: 0,
  },
  misses: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div class="d-flex justify-content-evenly my-3">
    <p class="header-title text-check">Aciertos: {{ points }}</p>
    <p class="header-title text-danger">Errores: {{ misses }}</p>
  </div>
</template>
