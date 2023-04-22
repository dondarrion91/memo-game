<script setup>
import "./scss/main.scss";

defineProps({
  header: {
    type: String,
    default: "HEADER",
  },
});
</script>

<template>
  <div class="panel">
    <div class="card panel__container">
      <div class="card-title">
        <h1 class="my-5 text-center form-label header-title">{{ header }}</h1>
      </div>
      <div class="card-body">
        <slot name="card-content"></slot>
      </div>
    </div>
  </div>
</template>
